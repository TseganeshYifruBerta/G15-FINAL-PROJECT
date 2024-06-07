const TestCase = require("../../models/question_testcase_submission/testCase");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const logger = require('../../logger');

const tempPythonDir = process.env.TEMP_PYTHON_DIR || path.resolve(__dirname);

// Ensure the directory exists and check permissions
if (!fs.existsSync(tempPythonDir)) {
  fs.mkdirSync(tempPythonDir, { recursive: true });
  logger.info(`Directory created: ${tempPythonDir}`);
} else {
  logger.info(`Directory already exists: ${tempPythonDir}`);
}

// Function to check directory permissions
const checkDirectoryPermissions = (dirPath) => {
  try {
    fs.accessSync(dirPath, fs.constants.R_OK | fs.constants.W_OK);
    logger.info(`Read and write permissions verified for directory: ${dirPath}`);
  } catch (err) {
    logger.error(`Permission issue for directory: ${dirPath}, Error: ${err.message}`);
    throw new Error(`Permission issue for directory: ${dirPath}`);
  }
};

// Check permissions for the temporary directory
checkDirectoryPermissions(tempPythonDir);

const getQuestionById = async (questionId) => {
  try {
    const question = await TestCase.findAll({ where: { labQuestionId: questionId } });

    if (question.length === 0) {
      return null;
    }

    return question;
  } catch (error) {
    logger.error(`An error occurred while fetching question by ID: ${error.message}`);
    throw new Error("Failed to fetch question by ID");
  }
};

var errorType = "";

const runPythonCode = (pythonCode, nums) => {
  return new Promise((resolve, reject) => {
    const tempFilePath = path.join(tempPythonDir, "tempkol.py");
    logger.info(`Temporary Python file path: ${tempFilePath}`);
    const functionNameMatch = pythonCode.match(/def\s+(\w+)\s*\(/);
    const functionName = functionNameMatch ? functionNameMatch[1] : "UnknownFunction";

    const modifiedPythonCode = pythonCode.replace(/print\(/g, 'sys.stderr.write(');
    const functionCall = `${functionName}(${JSON.stringify(nums)})`;

    const pythonScript = `${modifiedPythonCode}\n\nimport sys\nsys.stdout.write(str(${functionCall}))`;

    // Write the Python script to a temporary file
    fs.writeFile(tempFilePath, pythonScript, (err) => {
      if (err) {
        logger.error(`Failed to write temporary Python file: ${err.message}`);
        return reject(err);
      }

      logger.info(`Temporary Python file written to ${tempFilePath}`);

      // Add a short delay to ensure the file system has fully registered the file
      setTimeout(() => {
        // Check if the file exists after writing
        fs.access(tempFilePath, fs.constants.F_OK, (accessErr) => {
          if (accessErr) {
            logger.error(`Temporary file does not exist: ${tempFilePath}`);
            return reject(new Error(`Temporary file does not exist: ${tempFilePath}`));
          }

          // Log the contents of the file
          fs.readFile(tempFilePath, 'utf8', (readErr, fileContents) => {
            if (readErr) {
              logger.error(`Failed to read temporary Python file: ${readErr.message}`);
              return reject(readErr);
            }

            logger.info(`Temporary Python file contents:\n${fileContents}`);

            const trySpawnPython = (pythonExecutable) => {
              const pythonProcess = spawn(pythonExecutable, [tempFilePath], { shell: true });
              logger.info(`Python process started with executable: ${pythonExecutable}`);

              let result = "";
              let printOutput = "";

              pythonProcess.stdout.on("data", (data) => {
                result += data.toString();
                logger.info(`Python process stdout: ${data.toString()}`);
              });

              pythonProcess.stderr.on("data", (data) => {
                printOutput += data.toString();
                logger.error(`Python process stderr: ${data.toString()}`);
              });

              pythonProcess.on("close", (code) => {
                fs.unlink(tempFilePath, (unlinkErr) => {
                  if (unlinkErr) {
                    logger.error(`Failed to delete temporary file: ${unlinkErr.message}`);
                  }
                });

                if (code === 0) {
                  resolve({ result: result.trim(), printOutput: printOutput.trim() });
                } else {
                  const errorTypeMatch = printOutput.match(/(\w+Error):/);
                  if (errorTypeMatch) {
                    errorType = errorTypeMatch[1];
                  }
                  reject(new Error(`Python process exited with code ${code}. Error: ${printOutput.trim()}`));
                }
              });

              pythonProcess.on("error", (err) => {
                if (pythonExecutable === "python") {
                  // If 'python' fails, try 'python3'
                  trySpawnPython("python3");
                } else {
                  // If both 'python' and 'python3' fail, reject the promise
                  reject(new Error(`Failed to start Python process: ${err.message}`));
                }
              });
            };

            // Start with 'python' and fall back to 'python3' if needed
            trySpawnPython("python");
          });
        });
      }, 1000); // Delay of 1000 milliseconds
    });
  });
};

const codeExecute = async (req, res) => {
  const { questionId, pythonCode } = req.body;

  try {
    const testCases = await getQuestionById(questionId);

    if (pythonCode === "") {
      return res.status(400).json({ error: "You should provide valid code." });
    }

    if (testCases) {
      const allTestResults = [];
      const statusData = [];

      for (const testCase of testCases) {
        const { input, output } = testCase.dataValues;
        const inputJson = input.replace(/'/g, '"');
        logger.info(`Input JSON: ${inputJson}`);
        var inputJsons = `{${inputJson}}`;
        const inputObject = JSON.parse(inputJsons);
        const valuesArray = Object.values(inputObject);
        let results;

        logger.info(`Values Array: ${valuesArray}`);

        if (valuesArray.length > 1) {
          const { nums, score } = valuesArray;
          results = await runPythonCode(pythonCode, [nums, score]);
        } else {
          const nums = valuesArray[0];
          results = await runPythonCode(pythonCode, nums);
        }

        const testResults = {
          input,
          expectedOutput: output,
          actualOutput: results.result,
          printed: results.printOutput,
          passed: output === results.result,
        };

        statusData.push(testResults.passed ? "Accepted" : "Wrong Answer");
        allTestResults.push(testResults);
      }

      const overallStatus = statusData.every(status => status === "Accepted") ? "Accepted" : "Wrong Answer";
      res.json({ allTestResults, pythonCode, overallStatus });
    } else {
      res.status(404).json({ error: "Question ID not found." });
    }
  } catch (error) {
    logger.error(`An error occurred during code execution: ${error.message}`);
    const errorMessagePattern = /File "[^"]+", line \d+.*$/s;
    const matches = error.message.match(errorMessagePattern);
    const refinedMessage = matches ? matches[0] : "Unknown error";

    res.status(500).json({ error: refinedMessage });
  }
};

module.exports = { codeExecute, runPythonCode };
