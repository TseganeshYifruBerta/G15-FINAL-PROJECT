// routes.js
const express = require("express");
const executionRouter = express.Router();

// code execution
const { codeExecute}= require("../../controller/codeExecution/codeExecution")
const { execute } = require("../../controller/codeExecution/codeSubmission");
const {
    countSubmissionsForDate,
    countSubmissionsForDateByUserId,
  } = require("../../controller/codeExecution/specificDate")

// fetching difficulty tag counts
const getAllDifficultyData= require("../../controller/codeExecution/manageCodeSubmittedData")


executionRouter.post("/submit", execute);
executionRouter.post("/run", codeExecute); 
executionRouter.get("/getSubmittedDifficulty", getAllDifficultyData);
executionRouter.get("/countSubmissionsForDate/:date",countSubmissionsForDate);
executionRouter.get("/countSubmissionsForDateByUserId/:userId/:date",countSubmissionsForDateByUserId)



module.exports = executionRouter;
