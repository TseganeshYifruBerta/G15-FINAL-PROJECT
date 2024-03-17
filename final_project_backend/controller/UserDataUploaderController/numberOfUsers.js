const studentData = require("../../models/userUpload/studentUploads");
const Teacher = require("../../models/userUpload/teacherUploads");

const getNumberOfAllStudent = async(req,res) =>{
    try{
      const student = await studentData.findAll();
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
      return res.status(200).json(5)
     
    } catch(error){
     console.log(error);
     return res.sendStatus(400);
    }
}
module.exports =  {getNumberOfAllStudent , getNumberOfAllTeacher}