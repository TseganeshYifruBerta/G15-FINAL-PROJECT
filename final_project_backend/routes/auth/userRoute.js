// routes.js
const express = require("express");
const router = express.Router();
const {login , activateUser}  = require("../../controller/userAuthorization/userLogin");
// const activateUser = require("../../controller/userAuthorization/userLogin");
const { isAdmin } = require("../../middleware/roleMiddleWare");
const verifyRoles = require("../../middleware/verifyRoles");


router.post("/userLogin", login);
router.post("/activateUser",verifyRoles("admin"),isAdmin,   activateUser);


module.exports = router;
