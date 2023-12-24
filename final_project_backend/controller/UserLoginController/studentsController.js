const Student = require("../../../models/registration/user/studentsModel.js");
const jwt = require("jsonwebtoken");
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

    const token = jwt.sign({ userId }, "your-secret-key");

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};

module.exports = { studentLogin };