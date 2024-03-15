const express = require("express");
const examRouters = express.Router();
const submitExamQuestionWithTestCaseAndSolution = require("../../controller/exam/examController")
const getAllExamQuestions = require("../../controller/exam/getAllExamQuestion")
const getExamQuestionById = require("../../controller/exam/getEXamQuestionById")

const { editQuestion } = require("../../controller/exam/manageExamQuestion.js/updateExam");
const { deleteExam } = require("../../controller/exam/manageExamQuestion.js/deleteExam");
examRouters.post("/submitExam", submitExamQuestionWithTestCaseAndSolution);
examRouters.get("/getAllExamQuestions" ,getAllExamQuestions);
examRouters.get("/getExamQuestionById/:id" ,getExamQuestionById)
examRouters.delete("/deleteExamQuestionById/:examQuesId" ,deleteExam);
examRouters.put("/updateExamQuestionById/:examQuesId" ,editQuestion);


module.exports = examRouters;