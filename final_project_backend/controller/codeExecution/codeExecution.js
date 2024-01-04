const Question = require("../../models/question_testcase_submission/question");
const TestCase = require("../../models/question_testcase_submission/testCase");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const getQuestionById = async (questionId) => {
  try {
    const question = await TestCase.findByPk(questionId);
    return question;
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    throw new Error("Failed to fetch question by ID");
  }
};

const runPythonCode = (pythonCode, nums,target) => {
  return new Promise((resolve, reject) => {
    const tempFilePath = path.join(__dirname, "tempkol.py");
    const functionNameMatch = pythonCode.match(/def\s+(\w+)\s*\(/);
    const functionName = functionNameMatch
      ? functionNameMatch[1]
      : "UnknownFunction";
    const functionCall = `${functionName}(${JSON.stringify(nums)}, ${target})`;;
    const pythonScript = `${pythonCode}\n\nprint(${functionCall})`;
    fs.writeFile(tempFilePath, pythonScript, (err) => {
      if (err) {
        reject(err);
      } else {
        const pythonProcess = spawn("python", [tempFilePath, nums,target]);

        let result = "";
       
        

        pythonProcess.stdout.on("data", (data) => {
          result += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
          console.error(`Python process error: ${data}`);
          reject(new Error(`Python process error: ${data}`));
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
const execute = async (req, res) => {
  const { questionId, pythonCode } = req.body;

  try {
    console.log("Fetching test cases for question ID:", questionId);
    const testCases = await getQuestionById(questionId);
    console.log("Fetched test cases:", testCases);

    const nums = JSON.parse(testCases.dataValues.nums);
    const target = testCases.dataValues.target;
    const args = [nums, target];
    const results = await runPythonCode(pythonCode, nums,target);
    const testResults = {
      input: {
        nums: JSON.parse(testCases.dataValues.nums),
        target: testCases.dataValues.target,
      },
      expectedOutput: testCases.dataValues.output,
      actualOutput: results,
      passed:
        JSON.stringify(results) === (JSON.stringify(testCases.dataValues.output)),
    };

    res.json({ testResults });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch question or test cases" });
  }
};

module.exports = { execute };
