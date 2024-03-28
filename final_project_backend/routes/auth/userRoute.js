// routes.js
const express = require("express");
const router = express.Router();
const login = require("../../controller/userAuthorization/userLogin");



router.post("/userLogin", login);



module.exports = router;
