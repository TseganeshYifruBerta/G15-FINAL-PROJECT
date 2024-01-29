const express = require("express");
const examRouters = express.Router();
const submitExamQuestionWithTestCaseAndSolution = require("../../controller/exam/examController")
const getAllExamQuestions = require("../../controller/exam/getAllExamQuestion")
const getExamQuestionById = require("../../controller/exam/getEXamQuestionById")
examRouters.post("/submitExam", submitExamQuestionWithTestCaseAndSolution);
examRouters.get("/getAllExamQuestions" ,getAllExamQuestions);
examRouters.get("/getExamQuestionById/:id" ,getExamQuestionById)


module.exports = examRouters;