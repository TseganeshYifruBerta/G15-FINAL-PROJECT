// routes.js
const express = require("express");
const executionRouter = express.Router();

// code execution
const { codeExecute}= require("../../controller/codeExecution/codeExecution")
const { execute } = require("../../controller/codeExecution/codeSubmission");


// fetching difficulty tag counts
const getAllDifficultyData= require("../../controller/codeExecution/manageCodeSubmittedData")


executionRouter.post("/submit", execute);
executionRouter.post("/run", codeExecute); 
executionRouter.get("/getSubmittedDifficulty/:userId", getAllDifficultyData);




module.exports = executionRouter;
