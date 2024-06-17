
const creatExam = require("../../models/exam/createExam");
const gradeResult = require("../../models/grading/grading");
const sequelize = require('../../database/sequelize')

const fetchAllGradedExams = async (req, res) => {
    try {

        const checkedExams = await sequelize.query("SELECT DISTINCT `examId` FROM `gradeResults`", {
            model: gradeResult,
            mapToModel: true 
        });
        console.log("checkedExams",checkedExams)    

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

module.exports = fetchAllGradedExams;
