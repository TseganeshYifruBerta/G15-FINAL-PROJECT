const examTestCase = require("../../models/exam/examTestcase");
const Solution = require("../../models/exam/solution");
const studentsExamAnswer = require("../../models/exam/studentsExamAnswer");
const studentsExamDetail = require("../../models/exam/submittedExamDetail"); // Import the studentsExamDetail model
const ExamQuestion = require("../../models/exam/uploadExamQuestion");
const criteria = require("../../models/grading/criteria");

const getStudentExamAnswerById = async (userId, questionId) => {
    try {
        const answers = await studentsExamDetail.findAll({
            where: {
                examQuestionId: questionId,
            },
            include: [{
                model: studentsExamAnswer,
                where: {
                    
                    UserinformationId: userId,


                },
            }]
        });
        return  answers ;
    } catch (error) {
        console.error("Error fetching answers:", error);
        throw error;
    }
};

const getrefrenceExamAnswerById = async ( questionId) => {
    try {
        const answers = await ExamQuestion.findAll({
            where: {
                examQuestionId: questionId,
            },
            include: [{
                model: Solution,
                as: "solutions",
               }]})
        const reference = answers.solutions[0]
            return  reference ;}
            catch (error) {
        console.error("Error fetching answers:", error);
        throw error;}
            };   
const getCriteriaById = async ( questionId) => {
                try {
                    const criteria = await criteria.findAll({
                        where: {
                            examQuestionId: questionId,
                        },
                       })
                   
                        return  criteria ;}
                        catch (error) {
                    console.error("Error fetching answers:", error);
                    throw error;}
                        };   
            
            
const getExamTestcaseById = async ( questionId) => {
        try {
            const testcases = await ExamQuestion.findAll({
                where: {
                    examQuestionId: questionId,
                },
                include: [{
                    model: examTestCase,
                    as: "testcases",
                                        }]})
            
                return  testcases ;}
                catch (error) {
            console.error("Error fetching answers:", error);
            throw error;}
                };   


module.exports = {getStudentExamAnswerById, getrefrenceExamAnswerById , getCriteriaById, getExamTestcaseById};
