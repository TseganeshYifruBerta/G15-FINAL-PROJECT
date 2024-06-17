// plagiarismRoutes.js
const express = require('express');

const gradingRouter = express.Router();

const {addCriteria,updateCriteria,deleteCriteria,getCriteriaDetailById} = require('../../controller/grading/manageCriteria');
const {getStudentExamAnswerById,getRefrenceExamAnswerById,getCriteriaById,getExamTestcaseById } = require('../../controller/grading/fetchGradingComponent')
const gradeResults = require('../../controller/grading/gradingController')
const fetchAllGradedExams = require('../../controller/grading/fetchAllGradedExams')
const getAllEndedExams = require('../../controller/grading/fetchAllEndedExams')
const fetchAllGradedStudents = require('../../controller/grading/fetchAllGradedStudents')
const fetchListOfGradedQuestionsByExamId = require('../../controller/grading/fetchListOfGradedQuestionsByExamId')
const fetchGradedResult = require('../../controller/grading/fetchGradeResult')
const fetchGradeResultByStudentId = require('../../controller/grading/getGradeResultByStudentId')

            // managing criteria
gradingRouter.post('/addCriteria', addCriteria);
gradingRouter.put('/updateCriteria/:criteriaId/:teacherId', updateCriteria);
gradingRouter.delete('/deleteCriteria/:criteriaId/:teacherId', deleteCriteria);
gradingRouter.get('/getCriteriaDetailById/:criteriaId/:teacherId', getCriteriaDetailById);



            //  managing grading
gradingRouter.get('/getStudentExamAnswerById/:id/:questionId/:examId', getStudentExamAnswerById);
gradingRouter.get('/getRefrenceExamAnswerById/:questionId', getRefrenceExamAnswerById);
gradingRouter.get('/getCriteriaById/:questionId/:examId', getCriteriaById);
gradingRouter.get('/getExamTestcaseById/:questionId', getExamTestcaseById);



              // check plagiarism
gradingRouter.post('/gradeResult', gradeResults);
gradingRouter.get('/fetchAllGradedExams', fetchAllGradedExams);
gradingRouter.get('/getAllEndedExams/:teacherId', getAllEndedExams);
gradingRouter.get('/fetchAllGradedStudents/:examId', fetchAllGradedStudents);
gradingRouter.get('/fetchListOfGradedQuestionsByExamId/:examId/:studentId', fetchListOfGradedQuestionsByExamId);
gradingRouter.get('/fetchGradedResult/:examId/:studentId/:questionId', fetchGradedResult);
gradingRouter.get('/fetchGradeResultByStudentId/:examId/:studentId', fetchGradeResultByStudentId);

module.exports = gradingRouter;
