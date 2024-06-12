const express = require('express');
const criteria = require('../../models/grading/criteria');
const { Model, where } = require('sequelize');
const grading = require('../../models/grading/grading');
const studentsExamAnswer = require('../../models/exam/studentsExamAnswer');
const studentsExamDetail = require('../../models/exam/submittedExamDetail');
const getCriteriaById = require('./getStudentExamAnswer');
const getStudentExamAnswerById = require('./getStudentExamAnswer');
const getrefrenceExamAnswerById = require('./getStudentExamAnswer');
const getExamTestcaseById = require('./getStudentExamAnswer');
const { default: axios } = require('axios');
const axios = require('axios');

const addCriteria  = async (req, res) =>  {
    

    const { 
            examId,
            examQuestionId,
            timeComplexity,
            codeQuality,
            codeComment,
            codeCorrectness,
            teacherId
        } = req.body;
   
    try {
    await criteria.create({
        examId,
        examQuestionId,
        timeComplexity,
        codeQuality,
        codeComment,
        codeCorrectness,
        teacherId
    });
    return res.status(201).json({message: 'Criteria created successfully'});

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Failed to create criteria'});
    }
}
// transaction







const gradeResult  = async (req, res) =>  {
    const {examId} = req.params;
    const {teacherId} = req.body;
    try{

        const findAllUser = await studentsExamAnswer.findAll({
            where:{
                examId:examId
            }
        })
    const allUser = findAllUser.map((userIds) => userIds.userinformationId)
    combinedResult = []
    for (usersId of allUser){
        const studentAnswer = await studentsExamAnswer.findAll(
            {
                where:{
                    examId:examId,
                    userinformationId:usersId

                },
                include:[
                    {
                        model: studentsExamDetail,
                        as: "studentsExamDetails"
                    }
                ]
            }
        )
        const examQuestionIds = studentAnswer[0].studentsExamDetails.map(detail => detail.examQuestionId);
        for (questionId of examQuestionIds){

            var student_code = await getStudentExamAnswerById(usersId, questionId);
            var reference_code = await getrefrenceExamAnswerById(questionId);
            var criteria = await getCriteriaById(questionId);
            var testcases = await getExamTestcaseById(questionId);
            
            if (!student_code || !reference_code) {
                return res.status(400).json({ message: "Invalid data received" });
            }

            const response = await axios.post('http://localhost:4000/grade', {
                student_code,
                reference_code,
                criteria: {
                    timeComplexity: criteria.timeComplexity,
                    codeQuality: criteria.codeQuality,
                    correctness: criteria.correctness,
                    comment: criteria.comment
                },
                testcases
            });
            const gradingData = {
                examId,
                examQuestionId: questionId,
                timeComplexity: response.data.timeComplexity,
                codeQuality: response.data.codeQuality,
                codeComment: response.data.codeComment,
                codeCorrectness: response.data.codeCorrectness,
                finalGrade: response.data.finalGrade,
                studentId: usersId,
                teacherId: teacherId
            }

            await grading.create(gradingData);

    }
    }
    return res.status(201).json({message: 'Grading completed successfully'});

} catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Failed to grade exam'});
}

}

        
module.exports = {addCriteria, gradeResult};