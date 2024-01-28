const Teacher = require("../../models/registration/user/teachersModel.js");
const jwt = require("jsonwebtoken");
const TeachersLogin = require("../../models/login/user/teachersModel.js");
const crypto = require("crypto");
const generateSecretKey = () => {
  const secretLength = 32; // Adjust the length as per your requirements
  return crypto.randomBytes(secretLength).toString("hex");
};
const teacherLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ where: { email } });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    if (teacher.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const secretKey = generateSecretKey();
    const tokenExpiration = "2d";

    const token = jwt.sign({ email }, secretKey, {
      expiresIn: tokenExpiration,
    });
    const loggedInTeacher = await TeachersLogin.create({
      email,
      password,
      token,
      teacherId:teacher.id
    });

    res.status(200).json({ loggedInTeacher });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { teacherLogin };
