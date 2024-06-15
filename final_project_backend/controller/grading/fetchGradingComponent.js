const examTestCase = require("../../models/exam/examTestcase");
const Solution = require("../../models/exam/solution");
const studentsExamAnswer = require("../../models/exam/studentsExamAnswer");
const ExamQuestion = require("../../models/exam/uploadExamQuestion");
const criteria = require("../../models/grading/criteria");

const getStudentExamAnswerById = async (id, questionId,examId) => {
// const getStudentExamAnswerById = async (req,res) => {
    // const {id, questionId,examId} = req.params;
    try {

        const answers = await studentsExamAnswer.findAll({
            where: {
                examQuestionId: questionId,
                examId: examId,
                UserinformationId: id
            },

        });
        const studentAnswer = answers[0].submittedAnswer
        // return res.status(200).json({answer});
        return studentAnswer;
    } catch (error) {
        console.error("Error fetching answers:", error);
        throw error;
    }
};

const getRefrenceExamAnswerById = async (questionId) => {
// const getRefrenceExamAnswerById = async (req,res) => {
//     const {questionId} = req.params;

    try {
        const answers = await ExamQuestion.findAll({
            where: {
                id: questionId,

            },
            include: [{
                model: Solution,
                as: "solutions",
            }]
        })
        const reference = answers[0].solutions[0].content
        // return res.status(200).json({reference});
        return reference;
    }
    catch (error) {
        console.error("Error fetching answers:", error);
        throw error;
    }
};
const getCriteriaById = async (questionId,examId) => {
// const getCriteriaById = async (req,res) => {
//     const {questionId,examId} = req.params;

    try {
        const criterias = await criteria.findAll({
            where: {
                examQuestionId: questionId,
                examId: examId
            },
        })
        const criteriaData = {
            timeComplexity: criterias[0].timeComplexity,
            codeQuality: criterias[0].codeQuality,
            codeComment: criterias[0].codeComment,
            codeCorrectness: criterias[0].codeCorrectness
        }

        return criteriaData;
        // return res.status(200).json({criteriaData});
    }
    catch (error) {
        console.error("Error fetching answers:", error);
        throw error;
    }
};


const getExamTestcaseById = async (questionId) => {
// const getExamTestcaseById = async (req,res) => {
//     const {questionId} = req.params;

    try {
        const testcases = await ExamQuestion.findAll({
            where: {
                id: questionId,
            },
            include: [{
                model: examTestCase,
                as: "examTestCase",
            }]
        })
        const resultTestcase = testcases[0].examTestCase.map((testcase) => {
            return {
                input: testcase.input,
                output: testcase.output
            }
        })

        return resultTestcase;
        // return res.status(200).json({resultTestcase});
    }
    catch (error) {
        console.error("Error fetching answers:", error);
        throw error;
    }
};


module.exports = { getStudentExamAnswerById, getRefrenceExamAnswerById, getCriteriaById, getExamTestcaseById };
