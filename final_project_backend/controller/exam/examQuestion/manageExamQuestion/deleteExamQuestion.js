const ExamQuestion = require("../../../../models/exam/uploadExamQuestion")
const examTestCase = require("../../../../models/exam/examTestcase")
const Solution = require("../../../../models/exam/solution")
const sequelize = require('../../../../database/sequelize'); // Import sequelize instance

const deleteExamQuestion = async (req, res) => {
    const { teacherId ,examQuestionId  } = req.params;

    try {
        const examQuestion = await ExamQuestion.findOne({
            where: {
                id: examQuestionId,
                teacherId: teacherId
            }
        });
        if (!examQuestion) {
            return res.status(404).json({ error: "Exam Question not found" });
        }

        const transaction = await sequelize.transaction();

        try {
            await examTestCase.destroy({ where: { examQuestionId: examQuestionId }, transaction });

            await Solution.destroy({ where: { examQuestionId: examQuestionId }, transaction });

            await examQuestion.destroy({where:{id:examQuestionId}, transaction });

            await transaction.commit();

            return res.status(200).json({ message: "Question deleted successfully" });
        } catch (error) {

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
