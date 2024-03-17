const Student = require("../../models/registration/user/studentsModel");
const Teacher = require("../../models/registration/user/teachersModel");
const Question = require("../../models/registration/user/studentsModel"); // Import the LabQuestion and TestCase models

const getNumberOfAllStudent = async(req,res) =>{
    try{
      const student = await Student.findAll();
      const count = student.length;
      return res.status(200).json(count)
     
    } catch(error){
     console.log(error);
     return res.sendStatus(400);
    }
};
const getNumberOfAllTeacher = async(req,res) =>{
    try{
      const teacher = await Teacher.findAll();
      const count = teacher.length;
      return res.status(200).json(count)
     
    } catch(error){
     console.log(error);
     return res.sendStatus(400);
    }
}
module.exports =  {getNumberOfAllStudent , getNumberOfAllTeacher}