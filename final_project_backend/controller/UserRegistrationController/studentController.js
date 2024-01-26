const Student = require("../../models/registration/user/studentsModel.js");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const { v4: uuidv4 } = require("uuid");
const studentData  = require("../../models/userUpload/studentUploads.js");
const otpModel = require("../../services/registration/otpGeneration.js");

const createStudent = async (req, res) => {
  const { name, email, userId, password, confirmPassword, section } = req.body;
  const Id = uuidv4();
  try {
    const studentDataUploaded = await studentData.findAll({
      where: {
        userId: userId,
      },
    });

    if (!studentDataUploaded) {
      return res.status(403).json({
        message: "Student data is not uploaded. Cannot register at this time",
      });
    }
    const userIdRegex =
      /^UGR\/\w{4}\/\w{2}$/ || /^ATR\/\w{4}\/\w{2}$/ || /^ETR\/\w{4}\/\w{2}$/; // Regular expression for UGR/XXXX/XX format
    if (!userIdRegex.test(userId)) {
      return res.status(400).json({
        message:
          "User ID must be in UGR/XXXX/XX or ATR/XXXX/XX or ETR/XXXX/XX  format",
      });
    }
    

   

    const newStudent = await Student.create({
      id: Id,
      name,
      email,
      userId,
      password,
      confirmPassword,
      section,
    });

    res.status(200).json(newStudent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while creating the student" });
  }
};

module.exports = { createStudent };
