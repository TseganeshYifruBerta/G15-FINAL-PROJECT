// routes.js
const express = require("express");
const router = express.Router();
const login = require("../../controller/userAuthorization/userLogin");
const {fetchAllStudentBasedOnSection} = require("../../controller/userDataUploadController/userUploadManagment");




router.post("/userLogin", login);

router.get("/fetchAllStudentBasedOnSection/:id",fetchAllStudentBasedOnSection );

module.exports = router;
