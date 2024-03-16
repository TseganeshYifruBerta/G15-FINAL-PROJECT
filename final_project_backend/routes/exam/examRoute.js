const express = require("express");
const examRouters = express.Router();
const submitExamQuestionWithTestCaseAndSolution = require("../../controller/exam/examController")
const getAllExamQuestions = require("../../controller/exam/getAllExamQuestion")
const getExamQuestionById = require("../../controller/exam/getEXamQuestionById")

const editExamQuestion  = require("../../controller/exam/manageExamQuestion/updateExamQuestion");
const deleteExamQuestion = require("../../controller/exam/manageExamQuestion/deleteExamQuestion");
examRouters.post("/submitExam", submitExamQuestionWithTestCaseAndSolution);
examRouters.get("/getAllExamQuestions" ,getAllExamQuestions);
examRouters.get("/getExamQuestionById/:id" ,getExamQuestionById);
examRouters.delete("/deleteExamQuestionById/:examQuesId" ,deleteExamQuestion);
examRouters.put("/updateExamQuestionById/:examQuesId" ,editExamQuestion);


module.exports = examRouters;