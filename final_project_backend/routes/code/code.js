// routes.js
const express = require("express");
const executionRouter = express.Router();
const { codeExecute}= require("../../controller/codeExecution/codeExecution")

executionRouter.post("/run", codeExecute); 

module.exports = executionRouter;
