const Teacher = require("../../../models/registration/user/teachersModel.js");
const jwt = require("jsonwebtoken")
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
    const token = jwt.sign({email}, "your-secret-key")
    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};

module.exports = { teacherLogin };