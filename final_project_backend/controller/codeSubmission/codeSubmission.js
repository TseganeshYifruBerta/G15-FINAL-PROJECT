const TestCase = require("../../models/question_testcase_submission/testCase");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const codeSubmision = require("../../models/codeSubmision/codeSubmision")
const Status = require("../../models/codeSubmision/codeStatus")
const Question = require("../../models/question_testcase_submission/question");
const Difficulty = require("../../models/codeSubmision/difficultyCounter");
const User = require("../../models/auth/user.model");
const Section = require("../../models/auth/section.model");
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
    const question = await TestCase.findAll({
      where: { labQuestionId: questionId },
    });
   
    if((question.length) === 0){

     return null
    
    }
    
    return question;
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    logger.error(`An error occurred while fetching question by ID: ${error.message}`);

    throw new Error("Failed to fetch question by ID");
  }
};

var errorType =""
const runPythonCode = (pythonCode, inputs) => {
  return new Promise((resolve, reject) => {
    const tempFilePath = path.join(tempPythonDir, "tempkol.py");
    logger.info(`Temporary Python file path: ${tempFilePath}`);
    const functionNameMatch = pythonCode.match(/def\s+(\w+)\s*\(/);
    const functionName = functionNameMatch ? functionNameMatch[1] : "UnknownFunction";
    
    const inputString = inputs.map(input => JSON.stringify(input)).join(', ');
    console.log("Input String:", inputString);
    const functionCall = `${functionName}(${inputString})`;

    const modifiedPythonCode = pythonCode.replace(/print\(/g, 'sys.stderr.write(');
    const pythonScript = `${modifiedPythonCode}\n\nimport sys\nsys.stdout.write(str(${functionCall}))`;


    // const modifiedPythonCode = pythonCode.replace(/print\(/g, 'sys.stderr.write(');
    // const functionCall = `${functionName}(${JSON.stringify(nums)})`;

    // const pythonScript = `${modifiedPythonCode}\n\nimport sys\nsys.stdout.write(str(${functionCall}))`;

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
              const pythonProcess = spawn(pythonExecutable, [tempFilePath]);

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
                  // reject(new Error(`Python process exited with code ${code}. Error: ${printOutput.trim()}`));
                  const errorTypeMatch = printOutput.match(/(\w+Error):/);
                  if (errorTypeMatch) {
                    errorType = errorTypeMatch[1];
                   
                  } 
                  else {}
                  // If the process exits with a non-zero code, consider it an error and reject the promise.
                  reject(new Error(`Python process exited with code ${code}. Error: ${printOutput.trim()}`));
                  
                }
              });

              pythonProcess.on("error", (err) => {
                logger.error(`Failed to start Python process: ${err.message}`);
                reject(new Error(`Failed to start Python process: ${err.message}`));
              });
            };

            // Start with 'python3' and fall back to 'python' if needed
            trySpawnPython("python3");
          });
        });
      }, 1000); // Delay of 1000 milliseconds
    });
  });
};



module.exports = { runPythonCode };
const submitCode = async (req, res) => {
  const { questionId, id, pythonCode } = req.body;

  try {
    if(!questionId || !id || !pythonCode){
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findByPk(id);
    if (!user ) {
      return res.status(400).json({ error: "User not found" });
    }
    var section = await Section.findOne({
      where: {
        UserInformationId: id,
      },
    });

  
    
    const testCases = await getQuestionById(questionId);
    if (pythonCode === "") {
      return res
        .status(500)
        .json({ error: "you should have to write a correct code " });
    }

    if(testCases){

    const allTestResults = [];
    const statusData = [];

    const questionsFound = await codeSubmision.findOne({
      where: {
        questionId: questionId,
      },
    });
   
    var codes = await codeSubmision.create({
      questionId,
      userId: id,
      section:section.section,
      userCode: pythonCode,
    });
    
    
    

    for (const testCase of testCases) {
     const { input, output } = testCase.dataValues;
        let inputValues;
      try {
        if (input.trim().startsWith('[') && input.trim().endsWith(']')) {
          console.log("Input is a single JSON array, parsing directly...");
          inputValues = [JSON.parse(input.trim().replace(/'/g, '"'))];
        } else {
          console.log("Input contains individual values, splitting...");
          inputValues = input.split(',').map(value => {
            const trimmedValue = value.trim();
            const validJsonValue = trimmedValue.replace(/'/g, '"');
            const parsedValue = JSON.parse(validJsonValue);
            console.log("Parsed Value:", parsedValue);
            return parsedValue;
          });
        }
      } catch (e) {
        console.error(`Error parsing input: ${input.trim()}`, e);
        throw new Error(`Error parsing input: ${input.trim()}`);
      }

      // Log the parsed input values before executing the Python code
      console.log("Final Parsed Input Values:", inputValues);

      // Ensure input values are ready before calling runPythonCode
      const results = await runPythonCode(pythonCode, inputValues);

      let expectedOutput, actualOutput;
      try {
        expectedOutput = JSON.parse(output);
        actualOutput = JSON.parse(results.result);
      } catch (e) {
        expectedOutput = output;
        actualOutput = results.result;
      }

      const testResults = {
        input,
        expectedOutput: JSON.stringify(expectedOutput),
        actualOutput: JSON.stringify(actualOutput),
        printed: results.printOutput,
        passed: JSON.stringify(expectedOutput) === JSON.stringify(actualOutput),
      };
     
       if(testResults.passed === true){
       
        statusData.push("Accepted");

        
        
       }else{
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

    const submittedTagStatus = await Status.findAll({
      where:{
        questionId: questionId,
        UserinformationId: id
      }
    });

    checker = false
    for (const submission of submittedTagStatus) {

      if(submission.status == "Accepted"){
        checker = true
        break
      }
    }

     if (checker == false &&( overallStatus == "Accepted" || overallStatus == "Wrong Answer")) {
       console.log("-----------------------------");
       easyCount = 0;
       mediumCount = 0;
       hardCount = 0;
       totalCount = 0;

       const questions = await Question.findOne({
         where: {
           id: questionId,
         },
       });
       tag = questions.dataValues.difficulty;

       const difficultyRecord = await Difficulty.findOne(); // Assuming there's only one record
       if (difficultyRecord) {
        await Difficulty.update(
          { userId: id },
          { where: { id: difficultyRecord.id } }
        );
         // Update the counts based on the difficulty level of the new submission
         if (tag === "easy") {
           await Difficulty.update(
             { easyCount: difficultyRecord.easyCount + 1 },
             { where: { id: difficultyRecord.id } }
           );
         } else if (tag === "medium") {
           await Difficulty.update(
             { mediumCount: difficultyRecord.mediumCount + 1 },
             { where: { id: difficultyRecord.id } }
           );
         } else if (tag === "hard") {
           await Difficulty.update(
             { hardCount: difficultyRecord.hardCount + 1 },
             { where: { id: difficultyRecord.id } }
           );
         }
         // Update the total count
         await Difficulty.update(
           {
             totalCount:
               difficultyRecord.easyCount +
               difficultyRecord.mediumCount +
               difficultyRecord.hardCount,
           },
           { where: { id: difficultyRecord.id } }
         );
       }
     }

    const newer = await Status.create({
      status: overallStatus,
      questionId: questionId,
      UserinformationId: id,
      submittedCodeId: codes.id,
      userCode: pythonCode,
      section:section.section
    });
    
  
    res.json({ allTestResults, codes, status: overallStatus,newer});
  }
    else{
      res.status(500).json({ error: "question Id is not Found" });
    }
  } catch (error) {

    console.error("Error:", error);
    const statuses = await Status.create({
      status :errorType,
      questionId: questionId,
      UserinformationId: id,
      submittedCodeId: codes.id,
      userCode: pythonCode,
      section: section.section
    });
    
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

module.exports = { submitCode };
