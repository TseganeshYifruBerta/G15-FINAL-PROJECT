const Student = require("../../models/registration/user/studentsModel");
const StudentsLogin = require("../../models/login/user/studentsModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const generateSecretKey = () => {
  const secretLength = 32; // Adjust the length as per your requirements
  return crypto.randomBytes(secretLength).toString("hex");
};
const studentLogin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const student = await Student.findOne({ where: { userId } });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const secretKey = generateSecretKey();
    const email = student.email;
    const tokenExpiration = "2d";
    const token = jwt.sign({ email }, secretKey, {
      expiresIn: tokenExpiration,
    });
    const loggedInStudent = await StudentsLogin.create({
      userId,
      password,
      token,
    });

    res.status(200).json({ loggedInStudent });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};

module.exports = { studentLogin };
