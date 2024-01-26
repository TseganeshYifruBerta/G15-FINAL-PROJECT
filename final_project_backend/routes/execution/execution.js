// routes.js
const express = require("express");
const executionRouter = express.executionRouter();

// code execution
const { execute } = require("../../controller/codeExecution/codeExecution");

executionRouter.post("/submit", execute);

module.exports = executionRouter;
