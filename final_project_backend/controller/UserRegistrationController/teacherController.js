const Teacher = require("../../../models/registration/user/teachersModel.js");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const {
  teacherData,
} = require("../../UserDataUploaderController/TeachersdataUploaderController.js");
const otpModel = require("../../../services/registration/otpGeneration.js");
const createTeacher = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, section } = req.body;
    const teacherDataUploaded = await teacherData.findAll({
      where: {
        email: email,
      },
    });
    if (!teacherDataUploaded) {
      return res.status(403).json({
        message: "Your  data is not uploaded. Cannot register at this time",
      });
    }
    const secret = speakeasy.generateSecret({ length: 20 });
    const otp = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
      digits: 6,
      step: 60,
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: "your_email_here",
        pass: "password",
      },
    });
    try {
      await transporter.sendMail({
        from: "your_email_here",
        to: `${email}`,
        subject: "Email Verification",
        text: `Please use the following verification token to verify your email: ${otp}`,
        html: `<p>Please use the following verification token to verify your email: <strong>${otp}</strong></p>`,
      });
      console.log("Verification email sent successfully");
      await otpModel.create({ email, otp });
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw new Error("Failed to send verification email");
    }
    const newTeacher = await Teacher.create({
      fullName,
      email,
      password,
      confirmPassword,
      section,
    });

    res.status(200).json(newTeacher);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while creating the teacher" });
  }
};

module.exports = { createTeacher};
