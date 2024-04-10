const express = require("express");
const examRouters = express.Router();
const submitExamQuestionWithTestCaseAndSolution = require("../../controller/exam/examQuestion/examQuestionController")
const getAllExamQuestions = require("../../controller/exam/examQuestion/getAllExamQuestion")
const getExamQuestionFilteredByTeacher = require("../../controller/exam/examQuestion/getExamQuestionFilteredByTeacher")
const {createExam,updateCreatedExam,deleteCreatedExam,startCreatedExam }=require("../../controller/exam/createExam/examController")
const deleteExamQuestion = require("../../controller/exam/examQuestion/manageExamQuestion/deleteExamQuestion")
const editExamQuestion = require("../../controller/exam/examQuestion/manageExamQuestion/updateExamQuestion")
const {getAllCreatedExams , getAllCreatedExamByTeacherId} = require("../../controller/exam/createExam/getExam")
const fetchDetailOfCreatedExamById = require("../../controller/exam/createExam/getExamById")
const examQuestionDetailById = require("../../controller/exam/examQuestion/examQuestionDetailById")
const { isTeacher} = require("../../middleware/roleMiddleWare");
const verifyRoles = require("../../middleware/verifyRoles");

           // exam question
examRouters.post("/uploadExamQuestion", submitExamQuestionWithTestCaseAndSolution);
examRouters.get("/getAllExamQuestions" ,getAllExamQuestions);
examRouters.get("/getExamQuestionFilteredByTeacher/:id" ,getExamQuestionFilteredByTeacher)
examRouters.delete("/deleteExamQuestionById/:teacherId/:examId" ,deleteExamQuestion);
examRouters.put("/updateExamQuestionById/:teacherId/:examId" ,editExamQuestion);

           // create exam route
examRouters.post("/createExam", verifyRoles("teacher"),isTeacher, createExam);
examRouters.put("/updateExam/:teacherId/:examId",  verifyRoles("teacher"),isTeacher,updateCreatedExam);
examRouters.delete("/deleteExam/:teacherId/:examId",  verifyRoles("teacher"),isTeacher,deleteCreatedExam);
examRouters.put("/startExam/:id",  verifyRoles("teacher"),isTeacher,startCreatedExam);


examRouters.get("/getAllCreatedExams", getAllCreatedExams);
examRouters.get("/getAllCreatedExamByTeacherId/:teacherId", getAllCreatedExamByTeacherId);


examRouters.get("/fetchDetailOfCreatedExamById/:examId", fetchDetailOfCreatedExamById);
examRouters.get("/examQuestionDetailById/:examQuestionId", examQuestionDetailById);



module.exports = examRouters;