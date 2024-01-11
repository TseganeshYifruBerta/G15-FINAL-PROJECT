// routes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createStudent,
} = require("../../../controller/UserRegistrationController/studentController");
const {
  createTeacher,
} = require("../../../controller/UserRegistrationController/teacherController");
const {
  studentLogin,
} = require("../../../controller/UserLoginController/studentsController");
const {
  teacherLogin,
} = require("../../../controller/UserLoginController/teachersController");
const uploadStudentsFile = require("../../../controller/UserDataUploaderController/StudentsDataUploaderController");
const uploadTeachersFile = require("../../../controller/UserDataUploaderController/TeachersdataUploaderController");
const studentsUpload = multer({ dest: "uploads/student" });
const teachersUpload = multer({ dest: "uploads/teacher" });
const pythonUpload = multer({ dest: "uploads/python" });

const {
  submitQuestionWithTestCases,
} = require("../../../controller/QuestionUploaderController/questionController");
const {
  getAllQuestions,
} = require("../../../controller/QuestionUploaderController/fetch_all_question");

const { execute } =
  require("../../../controller/codeExecution/codeExecution");
// student route
router.post("/register/students", createStudent);
router.post(
  "/upload/studentData",
  studentsUpload.single("studentsExcelFile"),
  uploadStudentsFile.uploadStudentsFile
);

// teacher route
router.post("/register/teachers", createTeacher);
router.post(
  "/upload/teacherData",
  teachersUpload.single("teachersExcelFile"),
  uploadTeachersFile.uploadTeachersFile
);

// Student login route
router.post("/login/students", studentLogin);

// Teacher login route
router.post("/login/teachers", teacherLogin);
router.post("/question", submitQuestionWithTestCases);
router.post("/submit",  execute);
router.get("/getAllQuestions", getAllQuestions);


module.exports = router;
