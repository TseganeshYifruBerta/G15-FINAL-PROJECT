const TestCase = require("../../models/question_testcase_submission/testCase");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

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
    console.error("Error fetching question by ID:", error);
    throw new Error("Failed to fetch question by ID");
  }
};

const runPythonCode = (pythonCode, nums) => {
  return new Promise((resolve, reject) => {
    const tempFilePath = path.join(__dirname, "tempkol.py");
    const functionNameMatch = pythonCode.match(/def\s+(\w+)\s*\(/);
    const functionName = functionNameMatch
      ? functionNameMatch[1]
      : "UnknownFunction";
    const functionCall = `${functionName}(${JSON.stringify(nums)})`;
    const pythonScript = `${pythonCode}\n\nprint(${functionCall})`;
    fs.writeFile(tempFilePath, pythonScript, (err) => {
      if (err) {
        reject(err);
      } else {
        const pythonProcess = spawn("python", [tempFilePath, nums]);

        let result = "";

        pythonProcess.stdout.on("data", (data) => {
          result += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
          console.error(`Python process error: ${data}`);
          reject(new Error(`Python process error: ${data}`));
          fs.unlink(tempFilePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting temporary file:", unlinkErr);
            }
          });
        });

        pythonProcess.on("close", (code) => {
          if (code === 0) {
            resolve(result.trim());

            fs.unlink(tempFilePath, (unlinkErr) => {
              if (unlinkErr) {
                console.error("Error deleting temporary file:", unlinkErr);
              }
            });
          } else {
            reject(new Error(`Python process exited with code ${code}`));
          }
        });
      }
    });
  });
};

module.exports = { runPythonCode };
const codeExecute = async (req, res) => {
  const { questionId, pythonCode } = req.body;

  try {
    const testCases = await getQuestionById(questionId);

    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnn", testCases);
    if (pythonCode === "") {
      return res.status(500).json({ error: "you should have to write a correct code " });
    }


    if (testCases) {
      const allTestResults = [];
      const statusData = [];


      for (const testCase of testCases) {
        const { input, output } = testCase.dataValues;
        let nums, score, results;

        if (typeof input === "object") {
          // If input is an object, assume it contains 'nums' and 'score'
          const { nums, score } = input;
          results = await runPythonCode(pythonCode, [nums, score]);
        } else {
          // If input is a string, assume it contains 'word'
          const word = input;
          const { num } = word;
          const inputData = JSON.parse(input);
          const key = Object.keys(inputData[0])[0]; // Get the first key dynamically
          const score = inputData[0][key];
          results = await runPythonCode(pythonCode, score);
        }

        // const results = await runPythonCode(pythonCode, nums || word, target);

        const testResults = {
          input: input,
          expectedOutput: JSON.parse(output)[0],
          actualOutput: results,
          passed: JSON.parse(output)[0] === results,
        };

        if (testResults.passed === true) {
          statusData.push("Accepted");
        } else {
          // Status.status = "Wrong Answer";
          statusData.push("Wrong Answer");
        }

        allTestResults.push(testResults);
      }
      let overallStatus;
      if (statusData.every((status) => status === "Accepted")) {
        overallStatus = "Accepted";
      } else if (statusData.some((status) => status === "Wrong Answer")) {
        overallStatus = "Wrong Answer";
      } else {
        overallStatus = "Wrong Answer"; // Handle other cases if needed
      }
      

      res.json({ allTestResults, pythonCode, overallStatus });
    } else {
      res.status(500).json({ error: "question Id is not Found" });
    }
  } catch (error) {
    console.error("Error:", error);
    
    const errorMessagePattern = /File "[^"]+", line \d+.*$/s;
    let matches = error.message.match(errorMessagePattern);
    
    let refinedMessage = "Unknown error";
    if (matches) {
      
      let parts = matches[0].split(/\.py"/);
      if (parts.length > 1) {
        
        refinedMessage = `File ${parts[1]}`;
      } else {
       
        refinedMessage = matches[0];
      }
    }
  
    res.status(500).json({ error: refinedMessage });
  }
  
};

module.exports = { codeExecute };
