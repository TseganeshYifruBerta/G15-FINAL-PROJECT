const express = require("express");
const examRouters = express.Router();
const submitExamQuestionWithTestCaseAndSolution = require("../../controller/exam/examQuestion/examQuestionController")
const getAllExamQuestions = require("../../controller/exam/examQuestion/getAllExamQuestion")
const getExamQuestionById = require("../../controller/exam/examQuestion/getEXamQuestionById")
const {createExam,updateCreatedExam,deleteCreatedExam,startCreatedExam }=require("../../controller/exam/createExam/examController")
const deleteExamQuestion = require("../../controller/exam/examQuestion/manageExamQuestion/deleteExamQuestion")
const editExamQuestion = require("../../controller/exam/examQuestion/manageExamQuestion/updateExamQuestion")
const {getAllExams , getExamById} = require("../../controller/exam/createExam/getExam")

examRouters.post("/uploadExamQuestion", submitExamQuestionWithTestCaseAndSolution);
examRouters.get("/getAllExamQuestions" ,getAllExamQuestions);
examRouters.get("/getExamQuestionById/:id" ,getExamQuestionById)
examRouters.delete("/deleteExamQuestionById/:examQuesId" ,deleteExamQuestion);
examRouters.put("/updateExamQuestionById/:examQuesId" ,editExamQuestion);
examRouters.post("/createExam", createExam);
examRouters.put("/updateExam/:id", updateCreatedExam);
examRouters.delete("/deleteExam/:id", deleteCreatedExam);
examRouters.put("/startExam/:id", startCreatedExam);
examRouters.get("/getAllExams", getAllExams);
examRouters.get("/getExamById/:id", getExamById);

module.exports = examRouters;