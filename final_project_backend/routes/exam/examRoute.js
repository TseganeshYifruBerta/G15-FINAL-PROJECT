const express = require("express");
const examRouters = express.Router();
const submitExamQuestionWithTestCaseAndSolution = require("../../controller/exam/examQuestion/examQuestionController")
const getAllExamQuestions = require("../../controller/exam/examQuestion/getAllExamQuestion")
const getExamQuestionFilteredByTeacher = require("../../controller/exam/examQuestion/getExamQuestionFilteredByTeacher")
const {  updateCreatedExam, deleteCreatedExam, startCreatedExam, endStartedExam } = require("../../controller/exam/createExam/examController")
const deleteExamQuestion = require("../../controller/exam/examQuestion/manageExamQuestion/deleteExamQuestion")
const editExamQuestion = require("../../controller/exam/examQuestion/manageExamQuestion/updateExamQuestion")
const {getAllCreatedExams , getAllCreatedExamByTeacherId} = require("../../controller/exam/createExam/getExam")
const fetchDetailOfCreatedExamById = require("../../controller/exam/createExam/getExamById")
const examQuestionDetailById = require("../../controller/exam/examQuestion/examQuestionDetailById")
const submitExamAnswerByStudent = require("../../controller/exam/submittedExamAnswer/submittedStudentsExamAnswer")
const fetchAllSubmittedStudentExamAnswerBySection = require("../../controller/exam/submittedExamAnswer/fetchsubmittedStudentExamAnswer")
const { isTeacher } = require("../../middleware/roleMiddleWare");
const verifyRoles = require("../../middleware/verifyRoles");
const createExam = require("../../controller/exam/createExam/createdExamController");
const fetchAllSections = require("../../controller/exam/createExam/fetchAllSection");
// exam question
examRouters.post("/uploadExamQuestion", submitExamQuestionWithTestCaseAndSolution);
examRouters.get("/getAllExamQuestions", getAllExamQuestions);
examRouters.get("/getExamQuestionFilteredByTeacher/:id", getExamQuestionFilteredByTeacher)
examRouters.delete("/deleteExamQuestionById/:teacherId/:examId", deleteExamQuestion);
examRouters.put("/updateExamQuestionById/:teacherId/:examId", editExamQuestion);

// create exam route
examRouters.post("/createExam",createExam);
examRouters.put("/updateExam/:teacherId/:examId", verifyRoles("teacher"), isTeacher, updateCreatedExam);
examRouters.delete("/deleteExam/:teacherId/:examId", verifyRoles("teacher"), isTeacher, deleteCreatedExam);
examRouters.put("/startExam/:id", verifyRoles("teacher"), isTeacher, startCreatedExam);
examRouters.put("/endExam/:id", verifyRoles("teacher"), isTeacher, endStartedExam);
examRouters.get("/fetchAllSections", fetchAllSections);


examRouters.get("/getAllCreatedExams", getAllCreatedExams);
examRouters.get("/getAllCreatedExamByTeacherId/:teacherId", getAllCreatedExamByTeacherId);

// detail of created exam and exam question

examRouters.get("/examQuestionDetailById/:examQuestionId", examQuestionDetailById);


// submitted exam answer by student
examRouters.post("/submitExamAnswerByStudent", submitExamAnswerByStudent);
examRouters.get("/fetchAllSubmittedStudentExamAnswerBySection/:teacherId", fetchAllSubmittedStudentExamAnswerBySection);









module.exports = examRouters;