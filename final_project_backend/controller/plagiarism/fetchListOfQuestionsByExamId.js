const ExamQuestion = require("../../models/exam/uploadExamQuestion");
const Allplagiarism = require("../../models/plagiarism/allPlagiarism");
const { all } = require("axios");


const fetchListOfQuestionsByExamId = async (req, res) => {
    try {
        const { examId } = req.params;
        const examFound = await Allplagiarism.findOne({
            where: {
                examId: examId,
            },

        });
        if (!examFound) {
            return res.status(400).json({ message: "The Exam has not been checked for plagiarism" });
        }



        const AllQuestions = await Allplagiarism.findAll({
            where: {
                examId: examId,

            },
            group: ['question'],
        });
        const questionId = AllQuestions.map(question => question.question);
        let allQuestionData = []
        for (const id of questionId) {
            const user = await ExamQuestion.findOne({
                where: {
                    id: id
                }
            });
           
            allQuestionData.push(user);
        }
       






        return res.status(200).json({ allQuestionData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = fetchListOfQuestionsByExamId
