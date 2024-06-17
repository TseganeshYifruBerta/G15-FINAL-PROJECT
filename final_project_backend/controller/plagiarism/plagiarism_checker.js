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
const studentsExamAnswer = require('../../models/exam/studentsExamAnswer')
// const studentsExamDetail = require('../../models/exam/submittedExamDetail')
const plagiarismSection = require('../../models/plagiarism/plagiarizedSection.model')
const sequelize = require('../../database/sequelize')
const Allplagiarism = require('../../models/plagiarism/allPlagiarism')

const checkPlagiarism = async (req, res) => {
    const { examId } = req.body;
    let combinedResults = []; // Declare combinedResults with let at the top of the function
  const transaction = await sequelize.transaction();
    
    try {
      const findAllUser = await studentsExamAnswer.findAll({
        where: { examId: examId },
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('UserinformationId')), 'UserinformationId']
        ],

      },{transaction});
      if (!findAllUser) {
        return res.status(400).json({ message: 'No students submitted Answer found for this exam' });
      } 

      const allUser = findAllUser.map((userIds) => userIds.UserinformationId);
      let allQuestions = []
    
      for (const Id of allUser) {
        console.log("///////////",Id)
         const studentAnswer = await studentsExamAnswer.findAll({
          where: { examId: examId, UserinformationId: Id },
         
            transaction
        });
      
        
        allQuestions = (studentAnswer.map((answer) => answer.examQuestionId))
       
       

        for (const questionId of allQuestions) {
            console.log("**********",questionId)
            
            let filePath1
          
          try {
            const studentOneAnswer = await fetchStudentExamAnswerById(Id, questionId,examId);
            const studentTwoAnswers = await fetchAnswersExcludingUser(Id, questionId,examId);
            
            if (!studentOneAnswer || studentOneAnswer.length === 0 || !studentTwoAnswers) {
              console.error("Invalid data received for student or comparison answers");
              continue; // Skip to the next iteration of the loop
            }
            
            filePath1 = await saveAsPythonFile(studentOneAnswer[0].submittedAnswer, `student_${Id}_answer`);
            
            for (const answer of studentTwoAnswers) {
                let filePath2; 
              filePath2 = await saveAsPythonFile(answer.submittedAnswer, `student_${answer.UserinformationId}_answer`);
              
              const formData = new FormData();
              formData.append('file1', fs.createReadStream(filePath1));
              formData.append('file2', fs.createReadStream(filePath2));
              
              const response = await axios.post('https://g15-final-project.onrender.com/check_plagiarism', formData, {
                headers: { ...formData.getHeaders() },
              });
              const plagiarismResult = response.data;
            
              const tagged_code = plagiarismResult.tagged_code;
              const plagiarizedSections = await parseTaggedCode(tagged_code);

              if(filePath2){
                fs.unlinkSync(filePath2)
              }
              if(plagiarismResult.ratio > 0){

              
              const plagiarismResults = await Allplagiarism.create({
                userId: Id,
                otherUserId: answer.UserinformationId,
                percentage: plagiarismResult.ratio,
                question: questionId,
                examId: examId
            }   , { transaction });

                plagiarizedSections.map(async (section) => {
                  await plagiarismSection.create({
                    allPlagiarismId : plagiarismResults.id,
                    taggedcode:section

                  }, { transaction });
                })

    
              const user = await User.findAll({
                where: { id: answer.UserinformationId },
                attributes: ['id', 'fullName', 'email', 'userId', 'role'],
                include: [{ model: Section, as: 'SectionsOfUser', attributes: ['id', 'section'] }],
                transaction
              });
              
              combinedResults.push({
                UserID: Id,
                questionTitle: `plagiarism checking for question ${questionId}`,
                plagiarismDetails: plagiarismResult,
                plagiarizedSections: plagiarizedSections,
                users: user,
                questionId: questionId
              });

            }
              
            }
            
          } catch (error) {
            console.error("Error during plagiarism check:", error);
            await transaction.rollback();
            return res.status(500).json({ message: "An error occurred during plagiarism checking." });
          } finally{
            if(filePath1){
              fs.unlinkSync(filePath1)

          }}
        }
    
}
      await transaction.commit();
    
      return res.status(200).json({ combinedResults });
    } catch (error) {
        try {
            
            // fs.unlinkSync(path.join(__dirname, 'answer1.py'));
            // fs.unlinkSync(path.join(__dirname, 'answer2.py'));
        } catch (cleanupError) {
            console.error("Cleanup Error:", cleanupError);
            
        }
        // res.status(500).json({ message: "Internal server error" });
      res.status(500).json(error);
    }
  };
  

      
module.exports = checkPlagiarism;
