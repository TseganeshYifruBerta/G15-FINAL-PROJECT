// plagiarismRoutes.js
const express = require('express');

const gradingRouter = express.Router();

const {addCriteria,updateCriteria,deleteCriteria,getCriteriaDetailById} = require('../../controller/grading/manageCriteria');
const {getStudentExamAnswerById,getRefrenceExamAnswerById,getCriteriaById,getExamTestcaseById } = require('../../controller/grading/fetchGradingComponent')
const gradeResult = require('../../controller/grading/gradingController')



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
gradingRouter.post('/gradeResult', gradeResult);

module.exports = gradingRouter;
