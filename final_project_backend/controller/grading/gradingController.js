const express = require('express');
const { Model, where ,Sequelize, FLOAT} = require('sequelize');
const gradeResult = require('../../models/grading/grading');
const studentsExamAnswer = require('../../models/exam/studentsExamAnswer');

const {getCriteriaById,getStudentExamAnswerById,getRefrenceExamAnswerById,getExamTestcaseById} = require('./fetchGradingComponent')
// const { default: axios } = require('axios');
const sequelize = require('../../database/sequelize')

const axios = require('axios');


const gradeResults  = async (req, res) =>  {
  
    const {examId,teacherId} = req.body;
    const transaction = await sequelize.transaction();
    let combinedResults = []; // Declare combinedResults with let at the top of the function


    try{
        if(!examId || !teacherId){
            return res.status(400).json({message: 'Invalid data received'});
        }
        console.log("................",examId)
        console.log("...ooooooooooooo......",teacherId)
        const exam = await gradeResult.findOne({
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
        if(!findAllUser){
            return res.status(400).json({message: 'No students submitted Answer found for this exam'});
        }

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
            const finalGradedData = FLOAT(response.data.finalGrade.score) * (criteria.gradevalue / 10)
    
            
            const data = await gradeResult.create({
                examId,
                examQuestionId: questionId,
                timeComplexityValue: response.data.timeComplexity.score,
                timeComplexityDescription: response.data.timeComplexity.description,
                codeQualityValue: response.data.codeQuality.score,
                codeQualityDescription: response.data.codeQuality.description,
                codeCommentValue: response.data.documentation.score,
                codeCommentDescription: response.data.documentation.description,
                codeCorrectnessValue: response.data.correctness.score,
                codeCorrectnessDescription: response.data.correctness.description,
                finalGrade: String(finalGradedData),
                studentId: id,
                teacherId: teacherId
              }, { transaction });

            combinedResults.push({
                examId,
                examQuestionId: questionId,
                timeComplexityValue: response.data.timeComplexity.score,
                timeComplexityDescription: response.data.timeComplexity.description,
                codeQualityValue: response.data.codeQuality.score,
                codeQualityDescription: response.data.codeQuality.description,
                codeCommentValue: response.data.documentation.score,
                codeCommentDescription: response.data.documentation.description,
                codeCorrectnessValue: response.data.correctness.score,
                codeCorrectnessDescription: response.data.correctness.description,
                finalGrade: response.data.finalGrade.score,
                studentId: id,
                teacherId: teacherId
              });
      
              



            // await gradeResult.create(response.data,{transaction});
            // return res.status(201).json(data);


    }
    }
    await transaction.commit();
    return res.status(201).json({message: 'Grading completed successfully', combinedResults});

} catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Failed to grade exam'});
}

}

        
module.exports = gradeResults;