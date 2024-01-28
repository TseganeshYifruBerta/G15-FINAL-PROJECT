// routes.js
const express = require("express");
const executionRouter = express.Router();

// code execution
const { codeExecute}= require("../../controller/codeExecution/codeExecution")
const { execute } = require("../../controller/codeExecution/codeSubmission");

executionRouter.post("/submit", execute);
executionRouter.post("/run", codeExecute);


module.exports = executionRouter;
