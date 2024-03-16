const express = require("express");
const examRouters = express.Router();
const submitExamQuestionWithTestCaseAndSolution = require("../../controller/exam/examQuestion/examQuestionController")
const getAllExamQuestions = require("../../controller/exam/examQuestion/getAllExamQuestion")
const getExamQuestionById = require("../../controller/exam/examQuestion/getEXamQuestionById")

const editExamQuestion = require("../../controller/exam/examQuestion/manageExamQuestion/updateExamQuestion");
const deleteExamQuestion = require("../../controller/exam/examQuestion/manageExamQuestion/deleteExamQuestion");
examRouters.post("/submitExam", submitExamQuestionWithTestCaseAndSolution);
examRouters.get("/getAllExamQuestions", getAllExamQuestions);
examRouters.get("/getExamQuestionById/:id", getExamQuestionById);
examRouters.delete("/deleteExamQuestionById/:id", deleteExamQuestion);
examRouters.put("/updateExamQuestionById/:id", editExamQuestion);


module.exports = examRouters;