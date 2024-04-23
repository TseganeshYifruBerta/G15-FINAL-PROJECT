const express = require("express");
const examRouters = express.Router();
const submitExamQuestionWithTestCaseAndSolution = require("../../controller/exam/examQuestion/examQuestionController")
const getAllExamQuestions = require("../../controller/exam/examQuestion/getAllExamQuestion")
const getExamQuestionFilteredByTeacher = require("../../controller/exam/examQuestion/getExamQuestionFilteredByTeacher")
const createExam = require("../../controller/exam/createExam/createdExamController")
const {updateCreatedExam,deleteCreatedExam,startCreatedExam , AddSectionToExam,DeleteSectionToExam , endStartedExam}=require("../../controller/exam/createExam/examController")
const upcomingExam = require("../../controller/exam/createExam/upcomingExam")
const deleteExamQuestion = require("../../controller/exam/examQuestion/manageExamQuestion/deleteExamQuestion")
const {editExamQuestion , addSolution , deleteSolution , AddTestcases,DeleteTestcases} = require("../../controller/exam/examQuestion/manageExamQuestion/updateExamQuestion")
const {getAllCreatedExams , getAllCreatedExamByTeacherId} = require("../../controller/exam/createExam/getExam")
const getExamByIdWithQuestions = require("../../controller/exam/createExam/getExamById")
const examQuestionDetailById = require("../../controller/exam/examQuestion/examQuestionDetailById")
const submitExamAnswerByStudent = require("../../controller/exam/submittedExamAnswer/submittedStudentsExamAnswer")
const fetchAllSubmittedStudentExamAnswerBySection = require("../../controller/exam/submittedExamAnswer/fetchSubmittedStudentExamAnswer")
const { isTeacher } = require("../../middleware/roleMiddleWare");
const verifyRoles = require("../../middleware/verifyRoles");
const {getAllExamtakeStudent,getSubmissionOfstudentByQuestionId} = require("../../controller/exam/submittedExamAnswer/getAllExamtakeStudent");
const e = require("express");
const createdExamDetailWithSolution = require("../../controller/exam/createExam/createdExamDetailWithSolution");
const getAllEndedExamsByStudentId = require("../../controller/exam/createExam/getAllEndedExamByStudentId");

examRouters.post("/AddTestcases", AddTestcases);
examRouters.delete("/DeleteTestcases/:testCasesId",DeleteTestcases);
examRouters.delete("/deleteSolution/:solutionId",deleteSolution);
examRouters.post("/addSolution",addSolution);


examRouters.post("/uploadExamQuestion", submitExamQuestionWithTestCaseAndSolution);
examRouters.get("/getAllExamQuestions", getAllExamQuestions);
examRouters.get("/getExamQuestionFilteredByTeacher/:id", getExamQuestionFilteredByTeacher)
examRouters.delete("/deleteExamQuestionById/:teacherId/:examQuestionId", deleteExamQuestion);
examRouters.put("/updateExamQuestionById/:teacherId/:examQuestionId", editExamQuestion);


           // create exam routes

examRouters.post("/AddSectionToExam",AddSectionToExam);
examRouters.delete("/DeleteSectionToExam/:examId/:sectionId",DeleteSectionToExam);
examRouters.post("/createExam",createExam);
examRouters.put("/updateExam/:teacherId/:examId", updateCreatedExam);
examRouters.delete("/deleteExam/:teacherId/:examId",isTeacher,deleteCreatedExam);
examRouters.put("/startExam/:id",startCreatedExam);
examRouters.get("/getExamByIdWithQuestions/:examId", getExamByIdWithQuestions);
examRouters.get("/upcomingExam/:userId", upcomingExam);
examRouters.get("/createdExamDetailWithSolution/:examId", createdExamDetailWithSolution);

examRouters.put("/endExam/:id", endStartedExam);



examRouters.get("/getAllCreatedExams", getAllCreatedExams);
examRouters.get("/getAllCreatedExamByTeacherId/:teacherId", getAllCreatedExamByTeacherId);
examRouters.get("/getAllEndedExamsByStudentId/:studentId",getAllEndedExamsByStudentId)

// detail of created exam and exam question
examRouters.get("/examQuestionDetailById/:examQuestionId", examQuestionDetailById);


// submitted exam answer by student

examRouters.get("/getAllExamtakeStudent/:teacherId/:examId", getAllExamtakeStudent);
examRouters.get("/getSubmissionOfstudentByQuestionId/:userId/:questionId", getSubmissionOfstudentByQuestionId);
examRouters.post("/submitExamAnswerByStudent", submitExamAnswerByStudent);
examRouters.get("/fetchAllSubmittedStudentExamAnswerBySection/:teacherId", fetchAllSubmittedStudentExamAnswerBySection);









module.exports = examRouters;