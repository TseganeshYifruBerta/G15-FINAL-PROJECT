const fetchStudentExamAnswerById = require('./fetchStudentExamAnswerById');
const fetchAnswersExcludingUser = require('./fetchExamAnswersExcludingUser');
const saveAsPythonFile = require('./saveAsPythonFile');
const determineStudentIdForSection = require('./extract');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const parseTaggedCode = require('./parse');
const User = require('../../models/auth/user.model');
const Section = require('../../models/auth/section.model');
const Exam = require('../../models/exam/createExam')
const studentsExamAnswer = require('../../models/exam/studentsExamAnswer')
const studentsExamDetail = require('../../models/exam/submittedExamDetail')
const checkPlagiarism = async (req, res) => {
    const { examId} = req.params;
    try {
        // const examFound = await Exam.findOne({
        //     where:{
        //         id:examId
        //     }
        // })
        // if(!examFound){
        //     return res.status(400).json({messaage:"The exam is not found"})
        // }
        const findAllUser = await studentsExamAnswer.findAll({
            where:{
                examId:examId
            }
        })
      const allUser = findAllUser.map((userIds)=>userIds.UserinformationId)
      combinedResults = []
      for (usersId of allUser){
        

        const studentAnswer =  await studentsExamAnswer.findAll({
            where:{
                examId:examId,
                UserinformationId:usersId
            },
            include:[
                {
                    model:studentsExamDetail,
                    as: "studentsExamDetails"
                }
            ]

        })
        const examQuestionIds = studentAnswer[0].studentsExamDetails.map(detail => detail.examQuestionId);

        


        for(questionId of examQuestionIds){
            
            console.log("............",questionId)
            
        var studentOneAnswer = await fetchStudentExamAnswerById(usersId, questionId);
        var studentTwoAnswers = await fetchAnswersExcludingUser(usersId, questionId);

        if (!studentOneAnswer || !studentTwoAnswers) {
            return res.status(400).json({ message: "Invalid data received" });
        }
        var filePath1 = await saveAsPythonFile(studentOneAnswer[0].submittedAnswer, `student_${usersId}_answer`);

        
        let concatenatedAnswersWithIds = "";
        studentTwoAnswers.forEach(obj => {
            concatenatedAnswersWithIds += `
        # Student ID: ${obj.studentsExamAnswer.UserinformationId}
        def grade_student_${obj.studentsExamAnswer.UserinformationId}():
            ${obj.submittedAnswer}
            `;
        });

        console.log("Concatenated Answers with IDs:", concatenatedAnswersWithIds);

        var filePath2 = await saveAsPythonFile(concatenatedAnswersWithIds, `comparisons_for_student_${usersId}`);

        var formData = new FormData();
        formData.append('file1', fs.createReadStream(filePath1));
        formData.append('file2', fs.createReadStream(filePath2));

        var response = await axios.post('http://localhost:5050/check_plagiarism', formData, {
            headers: { ...formData.getHeaders() },
        });
        var plagiarismResult = response.data;

        fs.unlinkSync(filePath1);
        fs.unlinkSync(filePath2);
        tagged_code = plagiarismResult.tagged_code;
        var plagiarizedSections = await parseTaggedCode(tagged_code);


        var matchedUserId = await determineStudentIdForSection(concatenatedAnswersWithIds, plagiarizedSections)
        var user = await User.findAll({
            where: {
                id: matchedUserId
            },
            attributes: ['id', 'fullName','email', 'userId' ,'role' ],
            include:[
                {
                    model:Section,
                    as:'SectionsOfUser',
                    attributes:['id','section']
                }
            ]
        }); 
        var questionId = questionId

        combinedResults.push({
            UserID:usersId,
            questionTitle: `plagiarism checking for question ${questionId}`,
            plagiarismDetails: plagiarismResult,
            plagiarizedSections: plagiarizedSections,
            users: user, 
            questionId: questionId
        });
  
    
    }
}
    return res.status(200).json({combinedResults });


    } catch (error) {
        console.error("Error:", error);
        try {
            fs.unlinkSync(path.join(__dirname, 'answer1.py'));
            fs.unlinkSync(path.join(__dirname, 'answer2.py'));
        } catch (cleanupError) {
            console.error("Cleanup Error:", cleanupError);
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
      
module.exports = checkPlagiarism;
