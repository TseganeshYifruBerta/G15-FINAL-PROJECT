const express = require("express");
const dataUploadRouters = express.Router();
const multer = require("multer");
const  uploadUsersFile  = require("../../controller/userDataUploadController/dataUploader");
const submitUserfile = require("../../controller/userDataUploadController/inputDataUploader")
const verifyRoles = require("../../middleware/verifyRoles")
const userUpload = multer({ dest: "uploads/user" });
const {isAdmin, isTeacher} = require("../../middleware/roleMiddleWare");
const {fetchAllStudentBasedOnSection,findStudentByUserId ,updateUser} = require("../../controller/userDataUploadController/userUploadManagment");

            //  upload user data
dataUploadRouters.post("/userDataUploader", userUpload.single("usersExcelFile"),verifyRoles("admin"),isAdmin, uploadUsersFile);
 
            //  input user data
dataUploadRouters.post("/inputUserDataUploader", verifyRoles("admin"),isAdmin, submitUserfile);
 
            //  fetch all uploaded student data based on teacher's section
dataUploadRouters.get("/fetchAllStudentBasedOnSection/:id", verifyRoles("teacher"),isTeacher, fetchAllStudentBasedOnSection);

            // fetch all uploaded student data based on userID 
            // questioned
            
dataUploadRouters.get("/findStudentByUserId/:id",  verifyRoles("teacher"),isTeacher,findStudentByUserId );

            // update user data, only admin can update
dataUploadRouters.put("/updateUser/:id", verifyRoles("admin"),isAdmin,updateUser );




module.exports = dataUploadRouters;









