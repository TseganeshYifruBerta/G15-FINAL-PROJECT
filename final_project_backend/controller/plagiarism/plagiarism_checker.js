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
const checkPlagiarism = async (req, res) => {
    const { userId, questionId } = req.params;
    try {
        const studentOneAnswer = await fetchStudentExamAnswerById(userId, questionId);
        const studentTwoAnswers = await fetchAnswersExcludingUser(userId, questionId);

        if (!studentOneAnswer || !studentTwoAnswers) {
            return res.status(400).json({ message: "Invalid data received" });
        }

        
        const filePath1 = await saveAsPythonFile(studentOneAnswer[0].submittedAnswer, `student_${userId}_answer`);

        
        let concatenatedAnswersWithIds = "";
        studentTwoAnswers.forEach(obj => {
            concatenatedAnswersWithIds += `
        # Student ID: ${obj.studentsExamAnswer.UserinformationId}
        def grade_student_${obj.studentsExamAnswer.UserinformationId}():
            ${obj.submittedAnswer}
            `;
        });

        console.log("Concatenated Answers with IDs:", concatenatedAnswersWithIds);

        const filePath2 = await saveAsPythonFile(concatenatedAnswersWithIds, `comparisons_for_student_${userId}`);

        const formData = new FormData();
        formData.append('file1', fs.createReadStream(filePath1));
        formData.append('file2', fs.createReadStream(filePath2));

        const response = await axios.post('http://localhost:5050/check_plagiarism', formData, {
            headers: { ...formData.getHeaders() },
        });
        const plagiarismResult = response.data;

        fs.unlinkSync(filePath1);
        fs.unlinkSync(filePath2);
        tagged_code = plagiarismResult.tagged_code;
        const plagiarizedSections = await parseTaggedCode(tagged_code);


        const matchedUserId = await determineStudentIdForSection(concatenatedAnswersWithIds, plagiarizedSections)
        const user = await User.findAll({
            where: {
                id: matchedUserId
            },
            attributes: ['id', 'email', 'userId' ,'role' ],
            include:[
                {
                    model:Section,
                    as:'SectionsOfUser',
                    attributes:['id','section']
                }
            ]
        }); 


        return res.status(200).json({plagiarismResult,plagiarizedSections,user  });



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
