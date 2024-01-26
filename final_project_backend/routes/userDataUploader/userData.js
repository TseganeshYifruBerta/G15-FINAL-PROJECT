const express = require("express");
const dataUploadRouters = express.Router();
const multer = require("multer");
const {
  findStudentByID,
} = require("../../controller/UserDataUploaderController/studentDataManagement");

const uploadStudentsFile = require("../../controller/UserDataUploaderController/StudentsDataUploaderController");
const uploadTeachersFile = require("../../controller/UserDataUploaderController/TeachersdataUploaderController");
const studentsUpload = multer({ dest: "uploads/student" });
const teachersUpload = multer({ dest: "uploads/teacher" });
const {
  fetchAllUploadedStudentsFile,
} = require("../../controller/UserDataUploaderController/studentDataManagement");


dataUploadRouters.post(
  "/studentData",
  studentsUpload.single("studentsExcelFile"),
  uploadStudentsFile.uploadStudentsFile
);


dataUploadRouters.post(
  "/teacherData",
  teachersUpload.single("teachersExcelFile"),
  uploadTeachersFile.uploadTeachersFile
); 

dataUploadRouters.get("/getAllStudents", fetchAllUploadedStudentsFile);


dataUploadRouters.get("/findStudentByID/:id",findStudentByID)
module.exports = dataUploadRouters;
