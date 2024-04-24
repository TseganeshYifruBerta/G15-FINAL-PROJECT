const Allplagiarism = require("../../models/plagiarism/allPlagiarism");
const creatExam = require("../../models/exam/createExam");
const sequelize = require('../../database/sequelize')

const fetchAllPlagiarismCheckedExams = async (req, res) => {
    try {

        const checkedExams = await sequelize.query("SELECT DISTINCT `examId` FROM `Allplagiarisms`", {
            model: Allplagiarism,
            mapToModel: true 
        });

        let exams = [];
        // let examData 
        if (!checkedExams) {
            exams = [];
        } else {
            const examIds = checkedExams.map((examId) => examId.examId);
            for(const examId of examIds){

                const examData = await creatExam.findOne({
                    where: {
                        id: examId,
                    },
                });
                exams.push({
                     examData,
                });
                
            }
        };



            return res.status(200).json({ exams});
           
        

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = fetchAllPlagiarismCheckedExams;
