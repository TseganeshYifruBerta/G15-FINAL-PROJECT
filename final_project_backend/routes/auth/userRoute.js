// routes.js
const express = require("express");
const router = express.Router();

const {
  createStudent,
} = require("../../controller/UserRegistrationController/studentController");
const {
  createTeacher,
} = require("../../controller/UserRegistrationController/teacherController");
const {
  studentLogin,
} = require("../../controller/UserLoginController/studentsController");
const {
  teacherLogin,
} = require("../../controller/UserLoginController/teachersController");

// const pythonUpload = multer({ dest: "uploads/python" });

const { execute } = require("../../controller/codeExecution/codeExecution");

// student route
router.post("/register/students", createStudent);

// teacher route
router.post("/register/teachers", createTeacher);

// Student login route
router.post("/login/students", studentLogin);

// Teacher login route
router.post("/login/teachers", teacherLogin);

router.post("/submit", execute);

module.exports = router;
