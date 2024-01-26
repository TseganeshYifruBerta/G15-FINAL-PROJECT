// routes.js
const express = require("express");
const executionRouter = express.Router();

// code execution
const { execute } = require("../../controller/codeExecution/codeExecution");

executionRouter.post("/submit", execute);

module.exports = executionRouter;
