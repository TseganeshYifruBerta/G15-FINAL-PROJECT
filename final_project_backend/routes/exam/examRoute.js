const express = require("express");
const examRouters = express.Router();
const submitExamQuestionWithTestCaseAndSolution = require("../../controller/exam/examController")
const getAllExamQuestions = require("../../controller/exam/getAllExamQuestion")
const getExamQuestionById = require("../../controller/exam/getEXamQuestionById")
const createExam=require("../../controller/exam/createExam/examController")
const updateCreatedExam =  require("../../controller/exam/createExam/examController")
const deleteCreatedExam = require("../../controller/exam/createExam/examController")
const startcreatedExam = require("../../controller/exam/createExam/examController")



examRouters.post("/submitExam", submitExamQuestionWithTestCaseAndSolution);
examRouters.get("/getAllExamQuestions" ,getAllExamQuestions);
examRouters.get("/getExamQuestionById/:id" ,getExamQuestionById)
examRouters.delete("/deleteExamQuestionById/:examQuesId" ,deleteExamQuestion);
examRouters.put("/updateExamQuestionById/:examQuesId" ,editExamQuestion);
examRouters.post("/createExam", createExam);
examRouters.put("/updateExam/:id", updateCreatedExam);
examRouters.delete("/deleteExam/:id", deleteCreatedExam);
examRouters.put("/startExam/:id", startcreatedExam);

module.exports = examRouters;