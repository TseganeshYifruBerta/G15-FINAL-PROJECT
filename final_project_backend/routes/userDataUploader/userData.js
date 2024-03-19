const express = require("express");
const dataUploadRouters = express.Router();
const multer = require("multer");
const  uploadUsersFile  = require("../../controller/userDataUploadController/dataUploader");
const submitUserfile = require("../../controller/userDataUploadController/inputDataUploader")
const verifyRoles = require("../../middleware/verifyRoles")
const userUpload = multer({ dest: "uploads/user" });
const {isAdmin} = require("../../middleware/roleMiddleWare");



dataUploadRouters.post("/userDataUploader", userUpload.single("usersExcelFile"), uploadUsersFile);

dataUploadRouters.post("/inputUserDataUploader", verifyRoles("admin"),isAdmin, submitUserfile);


module.exports = dataUploadRouters;









