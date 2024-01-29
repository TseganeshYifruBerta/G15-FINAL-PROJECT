const Student = require("../../models/registration/user/studentsModel");
const Question = require("../../models/registration/user/studentsModel"); // Import the LabQuestion and TestCase models

const getNumberOfAllQuestion = async(req,res) =>{
    try{
      const student = await Student.findAll();
      const count = student.length;
      return res.status(200).json(count)
     
    } catch(error){
     console.log(error);
     return res.sendStatus(400);
    }
};
module.exports =  getNumberOfAllQuestion