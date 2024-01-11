const TestCase = require("../../models/question_testcase_submission/testCase");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const getQuestionById = async (questionId) => {
  try {
    const question = await TestCase.findAll({
      where: { labQuestionId: questionId },
    });
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
    const testCases = await getQuestionById(questionId);

    const allTestResults = [];

    for (const testCase of testCases) {
      const { input, output } = testCase.dataValues;
      let nums,  score, results;

      if (typeof input === "object") {
        // If input is an object, assume it contains 'nums' and 'target'
        
        // target = input.target;
        results = await runPythonCode(pythonCode, nums);

        
      } else {
        // If input is a string, assume it contains 'word'
      
        const inputData = JSON.parse(input);
        score = inputData[0].score;

        results = await runPythonCode(pythonCode,score);

      }

      // const results = await runPythonCode(pythonCode, nums || word, target);

      const testResults = {
        input: {
          nums: nums,
          score: score,
          // target: target,
        },
        expectedOutput: JSON.parse(output)[0],
        actualOutput: results,
        passed: JSON.parse(output)[0] === results,
      };

      allTestResults.push(testResults); 
    }

    res.json({ allTestResults });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch question or test cases" });
  }
};

module.exports = { execute };
