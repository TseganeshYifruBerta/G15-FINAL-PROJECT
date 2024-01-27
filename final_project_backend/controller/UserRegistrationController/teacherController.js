const Teacher = require("../../models/registration/user/teachersModel.js");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const 
  teacherData
 = require("../../models/userUpload/teacherUploads.js");
const otpModel = require("../../services/registration/otpGeneration.js");
const createTeacher = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, section } = req.body;
    const teacherDataUploaded = await teacherData.findAll({
      where: {
        email: email,
      },
      
    });
    if (!(teacherDataUploaded.length > 0) ){
      return res.status(403).json({
        message: "Your  data is not uploaded. Cannot register at this time",
      });
    }
    
    else{
    const newTeacher = await Teacher.create({
      fullName,
      email,
      password,
      confirmPassword,
      section,
    });

    res.status(200).json(newTeacher);}
  } catch (error) {
    res
      .status(500)
      .json({ error});
  }
};

module.exports = { createTeacher};
