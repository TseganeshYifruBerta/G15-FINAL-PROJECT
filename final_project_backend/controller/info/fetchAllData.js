const { Model } = require("sequelize");
const Question = require("../../models/question_testcase_submission/question"); // Import the LabQuestion and TestCase models
const User = require("../../models/auth/user.model");
const ExamQuestion = require("../../models/exam/uploadExamQuestion");

const getNumberOfAllQuestion = async(req,res) =>{
    try{
      const question = await Question.findAll();
      const examQuestion = await ExamQuestion.findAll()
      const countLab = question.length;
      const countExam = examQuestion.length;
      const count = countLab + countExam;
      return res.status(200).json({count})
     
    } catch(error){
     console.log(error);
     return res.status(500).json({ error: "Internal Server Error" });

    }
};

const numberAllUser = async(req,res) =>{
        try{
            const user = await User.findAll(
                {where: {role: ["student", "teacher"]}}); // Fetch all users with the role of student or teacher



              
            
            const count = user.length;
            return res.status(200).json({count})
        }
        catch(error){
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }}
               // fetch all teachers


module.exports = {getNumberOfAllQuestion,numberAllUser};