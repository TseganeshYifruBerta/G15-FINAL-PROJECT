const express = require("express");
const examRouters = express.Router();
const submitExamQuestionWithTestCaseAndSolution = require("../../controller/exam/examQuestion/examQuestionController")
const getAllExamQuestions = require("../../controller/exam/examQuestion/getAllExamQuestion")
const getExamQuestionById = require("../../controller/exam/examQuestion/getEXamQuestionById")
const {createExam,updateCreatedExam,deleteCreatedExam,startCreatedExam }=require("../../controller/exam/createExam/examController")
const deleteExamQuestion = require("../../controller/exam/examQuestion/manageExamQuestion/deleteExamQuestion")
const editExamQuestion = require("../../controller/exam/examQuestion/manageExamQuestion/updateExamQuestion")
const {getAllCreatedExams , getCreatedExamById} = require("../../controller/exam/createExam/getExam")

examRouters.post("/uploadExamQuestion", submitExamQuestionWithTestCaseAndSolution);
examRouters.get("/getAllExamQuestions" ,getAllExamQuestions);
examRouters.get("/getExamQuestionById/:id" ,getExamQuestionById)
examRouters.delete("/deleteExamQuestionById/:id" ,deleteExamQuestion);
examRouters.put("/updateExamQuestionById/:id" ,editExamQuestion);
examRouters.post("/createExam", createExam);
examRouters.put("/updateExam/:id", updateCreatedExam);
examRouters.delete("/deleteExam/:id", deleteCreatedExam);
examRouters.put("/startExam/:id", startCreatedExam);
examRouters.get("/getAllExams", getAllCreatedExams);
examRouters.get("/getCreateExamById/:id", getCreatedExamById);

module.exports = examRouters;