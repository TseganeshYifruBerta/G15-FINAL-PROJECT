// routes.js
const express = require("express");
const router = express.Router();
const login   = require("../../controller/userAuthorization/userLogin");
const changePassword = require("../../controller/userAuthorization/changePassword");    

router.post("/changePassword", changePassword);
router.post("/userLogin", login);


module.exports = router;
