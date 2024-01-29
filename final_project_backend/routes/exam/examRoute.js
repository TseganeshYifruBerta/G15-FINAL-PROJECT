const express = require("express");
const examRouters = express.Router();
const submitExamQuestionWithTestCaseAndSolution = require("../../controller/exam/examController")
examRouters.post("/submitExam", submitExamQuestionWithTestCaseAndSolution);



module.exports = examRouters;