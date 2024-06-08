// plagiarismRoutes.js
const express = require('express');

const plagiarismRouter = express.Router();

const checkPlagiarsm = require('../../controller/plagiarism/plagiarism_checker');
const fetchAnswersExcludingUser = require('../../controller/plagiarism/fetchExamAnswersExcludingUser');
const getAllEndedExams = require('../../controller/plagiarism/fetchAllEndedExams');
const fetchStudentExamAnswerById = require('../../controller/plagiarism/fetchStudentExamAnswerById');
const fetchAllPlagiarismCheckedExams = require('../../controller/plagiarism/fetchAllPlagiarismCheckedExams');
// const fetchStudentsFromPlagiarismCheckedExam = require('../../controller/plagiarism/fetchStudentsFromPlagiarismCheckedExam');
const fetchListOfQuestionsByExamId = require('../../controller/plagiarism/fetchListOfQuestionsByExamId');
const fetchAllPlagiarizedSections = require("../../controller/plagiarism/fetchAllplagiarizedSections")
const fetchAllPlagiarizedStudents = require('../../controller/plagiarism/fetchAllPlagiarizedStudents');

plagiarismRouter.post('/checkPlagiarsm', checkPlagiarsm);
plagiarismRouter.post('/fetchAnswersExcludingUser',fetchAnswersExcludingUser)
plagiarismRouter.post('/fetchStudentExamAnswerById/:userId/:questionId/:examId',fetchStudentExamAnswerById)

plagiarismRouter.get('/fetchAllEndedExams/:teacherId',getAllEndedExams)
plagiarismRouter.get('/fetchAllPlagiarismCheckedExams',fetchAllPlagiarismCheckedExams)
// plagiarismRouter.get('/fetchStudentsFromPlagiarismCheckedExam/:examId',fetchStudentsFromPlagiarismCheckedExam)
plagiarismRouter.get('/fetchListOfQuestionsByExamId/:examId/:studentId',fetchListOfQuestionsByExamId)
plagiarismRouter.get('/fetchAllPlagiarizedSections/:examId/:studentId/:questionId',fetchAllPlagiarizedSections)


plagiarismRouter.get('/fetchAllPlagiarizedStudents/:examId', fetchAllPlagiarizedStudents);
module.exports = plagiarismRouter;
