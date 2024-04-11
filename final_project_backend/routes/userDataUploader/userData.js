const express = require("express");
const dataUploadRouters = express.Router();
const multer = require("multer");
const uploadUsersFile = require("../../controller/userDataUploadController/dataUploader");
const submitUserfile = require("../../controller/userDataUploadController/inputDataUploader")
const verifyRoles = require("../../middleware/verifyRoles")
const userUpload = multer({ dest: "uploads/user" });
const { isAdmin, isTeacher } = require("../../middleware/roleMiddleWare");
const { fetchAllStudentBasedOnSection, updateUser,deleteUser ,fetchAllTeachers, fetchAllStudents, DeleteSections, AddSections } = require("../../controller/userDataUploadController/userUploadManagment");
const fetchAllSections = require("../../controller/userDataUploadController/fetchAllSection");
//  upload user data
dataUploadRouters.post("/userDataUploader", userUpload.single("usersExcelFile"), verifyRoles("admin"), isAdmin, uploadUsersFile);

//  input user data
dataUploadRouters.post("/inputUserDataUploader", verifyRoles("admin"), isAdmin, submitUserfile);

//  fetch all uploaded student data based on teacher's section
dataUploadRouters.get("/fetchAllStudentBasedOnSection/:id", verifyRoles("teacher"), isTeacher, fetchAllStudentBasedOnSection);

// fetch all uploaded student data based on userID 
// questioned

// dataUploadRouters.get("/fetchStudentByUserId/:id",verifyRoles("admin"), isAdmin,fetchStudentByUserId );
// dataUploadRouters.get("/fetchTeacherByUserId/:id",verifyRoles("admin"), isAdmin,fetchTeacherByUserId );


// update user data, only admin can update
dataUploadRouters.put("/updateUser/:id", verifyRoles("admin"), isAdmin, updateUser);
dataUploadRouters.delete("/deleteUser/:id", verifyRoles("admin"), isAdmin, deleteUser);


// fetch all students and teachers
dataUploadRouters.get("/fetchAllStudents", verifyRoles("admin"), fetchAllStudents);
dataUploadRouters.get("/fetchAllTeachers", verifyRoles("admin"), fetchAllTeachers);

// manage sections
dataUploadRouters.post("/AddSections", AddSections)
dataUploadRouters.delete("/DeleteSections/:sectionId", DeleteSections)
dataUploadRouters.get("/fetchAllSections", fetchAllSections);

module.exports = dataUploadRouters;









