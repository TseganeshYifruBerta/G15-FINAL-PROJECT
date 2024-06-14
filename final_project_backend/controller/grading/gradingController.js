const express = require('express');
const { Model, where ,Sequelize} = require('sequelize');
const grading = require('../../models/grading/grading');
const studentsExamAnswer = require('../../models/exam/studentsExamAnswer');

const {getCriteriaById,getStudentExamAnswerById,getRefrenceExamAnswerById,getExamTestcaseById} = require('./fetchGradingComponent')
// const { default: axios } = require('axios');
const sequelize = require('../../database/sequelize')

const axios = require('axios');


const gradeResult  = async (req, res) =>  {
  
    const {examId,teacherId} = req.body;
    const transaction = await sequelize.transaction();

    try{
        if(!examId || !teacherId){
            return res.status(400).json({message: 'Invalid data received'});
        }
        console.log("................",examId)
        console.log("...ooooooooooooo......",teacherId)
        const exam = await grading.findOne({
            where:{
                examId:examId
            }
        },{transaction})
        if(exam){
            await transaction.rollback();
            return res.status(400).json({message: 'Grading already done for this exam'});
        }
        

        const findAllUser = await studentsExamAnswer.findAll({
            where:{
                examId:examId
            },
            attributes:[
                [Sequelize.fn('DISTINCT', Sequelize.col('UserinformationId')), 'UserinformationId']
            ]
        },{transaction})

    const allUser = findAllUser.map((userIds) => userIds.UserinformationId)
    let allQuestions = []
    for (const id of allUser){
        console.log("///////////",id)
        
        const studentAnswer = await studentsExamAnswer.findAll({
            where: {
                examId: examId,
                UserinformationId: id
            },transaction

        });
        allQuestions = (studentAnswer.map((answer) => answer.examQuestionId))
        
        for (const questionId of allQuestions){
            console.log("**********",questionId)

            var student_code = await getStudentExamAnswerById(id, questionId,examId);
            var reference_code = await getRefrenceExamAnswerById(questionId);
            var criteria = await getCriteriaById(questionId,examId);
            var testcases = await getExamTestcaseById(questionId);
            
            // if (!student_code || !reference_code) {
            //     return res.status(400).json({ message: "Invalid data received" });
            // }
            

            const response = await axios.post('http://localhost:5060/grade', {
                student_code,
                reference_code,
                criteria: {
                    timeComplexity: criteria.timeComplexity,
                    codeQuality: criteria.codeQuality,
                    codeCorrectness: criteria.codeCorrectness,
                    codeComment: criteria.codeComment
                },
                testcases
            });

            console.log("*****rrrrrrrrrrrrrrrrrr****",response.data)
            // const gradingData = {
            //     examId,
            //     examQuestionId: questionId,
            //     timeComplexity: response.data.timeComplexity,
            //     codeQuality: response.data.codeQuality,
            //     codeComment: response.data.codeComment,
            //     codeCorrectness: response.data.codeCorrectness,
            //     finalGrade: response.data.finalGrade,
            //     studentId: id,
            //     teacherId: teacherId
            // }

            // await grading.create(response.data,{transaction});
            return res.status(201).json(response.data);

    }
    }
    return res.status(201).json({message: 'Grading completed successfully'});

} catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Failed to grade exam'});
}

}

        
module.exports = gradeResult;