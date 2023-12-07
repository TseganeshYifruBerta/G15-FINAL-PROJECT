const Student = require("../../../models/registration/user/studentsModel.js");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const { v4: uuidv4 } = require("uuid");
const {
  studentData,
} = require("../../UserDataUploaderController/StudentsDataUploaderController");
const otpModel = require("../../../services/registration/otpGeneration.js");

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
