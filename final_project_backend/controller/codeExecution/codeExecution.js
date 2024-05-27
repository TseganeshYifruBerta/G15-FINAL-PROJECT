const TestCase = require("../../models/question_testcase_submission/testCase");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const logger = require('../../logger');

const getQuestionById = async (questionId) => {
  try {
    const question = await TestCase.findAll({
      where: { labQuestionId: questionId },
    });

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
    const tempFilePath = path.join(__dirname, "tempkol.py");
    const functionNameMatch = pythonCode.match(/def\s+(\w+)\s*\(/);
    const functionName = functionNameMatch ? functionNameMatch[1] : "UnknownFunction";

    const modifiedPythonCode = pythonCode.replace(/print\(/g, 'sys.stderr.write(');
    const functionCall = `${functionName}(${JSON.stringify(nums)})`;

    const pythonScript = `${modifiedPythonCode}\n\nimport sys\nsys.stdout.write(str(${functionCall}))`;

    fs.writeFile(tempFilePath, pythonScript, (err) => {
      if (err) {
        logger.error(`Failed to write temporary Python file: ${err.message}`);
        return reject(err);
      }

      const pythonProcess = spawn("python", [tempFilePath, nums]);

      let result = "";
      let printOutput = "";

      pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        printOutput += data.toString();
        logger.error(`Python process error: ${data.toString()}`);
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
        inputJson = `{${inputJson}}`;
        const inputObject = JSON.parse(inputJson);
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
