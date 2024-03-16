const { model } = require("../../../../database/sequelize");
const ExamQuestion = require("../../../../models/exam/createExam")
const TestCase = require("../../../../models/exam/examTestcase")
const Solution = require("../../../../models/exam/solution")
const sequelize = require('../../../../database/sequelize'); // Import sequelize instance

const deleteExamQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const examQuestion = await ExamQuestion.findByPk(id);
        if (!examQuestion) {
            return res.status(404).json({ error: "Exam Question not found" });
        }

        // Start a transaction
        const transaction = await sequelize.transaction();

        try {
            // Delete the associated test cases
            await TestCase.destroy({ where: { examQuestionId: id }, transaction });

            // Delete the associated solution
            await Solution.destroy({ where: { examQuestionId: id }, transaction });

            // Delete the question itself
            await examQuestion.destroy({ transaction });

            // Commit the transaction
            await transaction.commit();

            return res.status(200).json({ message: "Question deleted successfully" });
        } catch (error) {
            // Rollback the transaction if there's an error
            await transaction.rollback();
            console.error(error);
            return res.status(500).json({ error: "Failed to delete Exam Question" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = deleteExamQuestion;
