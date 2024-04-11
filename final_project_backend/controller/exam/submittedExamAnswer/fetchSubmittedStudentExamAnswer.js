const ExamQuestion = require("../../../models/exam/uploadExamQuestion");
const studentsExamAnswer = require("../../../models/exam/studentsExamAnswer");
const Section = require("../../../models/auth/section.model");
const User = require("../../../models/auth/user.model");
const studentsExamDetail = require("../../../models/exam/submittedExamDetail"); // Import the studentsExamDetail model

const fetchAllSubmittedStudentExamAnswerBySection = async (req, res) => {
    try {
        const { teacherId } = req.params;

        const foundSection = await Section.findAll({
            where: {
                userInformationId: teacherId,
            },
            attributes: ["section"],
        });

        if (!foundSection || foundSection.length === 0) {
            return res.status(404).json({ message: "Sections not found" });
        }
// /]]][[[[[", foundSection);
        
        const userIds = [];
        
        for (const section of foundSection) {
            console.log("//////////",section.dataValues.section)
            // const examQuestions = await studentsExamAnswer.findAll({
            //     include: [
            //         {
            //             model: User,
            //             include: [
            //                 {
            //                     model: Section,
            //                     as: "SectionsOfUser",
            //                     where: {
            //                         section: section.dataValues.section,
            //                     },
            //                     attributes: ["section"],
            //                 },
            //             ],
            //         },
            //         {
            //             model: studentsExamDetail,
            //             as: "studentsExamDetails",
            //         },
            //     ],
            // });
            const examQuestions = await User.findAll({
                include: [
                    {
                
                        model: Section,
                        as: "SectionsOfUser",
                        where: {
                            section: section.dataValues.section,
                        },
                        attributes: ["section"],
                           
                    },
                    
                        {
                            model: studentsExamAnswer,
                            as: "studentsExamAnswer",
                            include: [
                                {
                                    model: studentsExamDetail,
                                    as: "studentsExamDetails",
                                    // include:[
                                    //     {
                                    //         model:ExamQuestion,
                                    //         where: {
                                    //             id: questionId,
                                    //         },
                                    //     }

                                    // ]
                                },
                            ],
                        },
                    
                   
                ],
            })
            userIds.push(examQuestions);
            
        }
        res.status(200).json({ userIds });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = fetchAllSubmittedStudentExamAnswerBySection;
