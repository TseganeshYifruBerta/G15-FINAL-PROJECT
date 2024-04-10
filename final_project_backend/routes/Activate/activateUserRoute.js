// routes.js
const express = require("express");
const ActivateRouter = express.Router();
// const activateUser = require("../../controller/userAuthorization/userLogin");
const { isAdmin } = require("../../middleware/roleMiddleWare");
const verifyRoles = require("../../middleware/verifyRoles");
const activateUser = require("../../controller/Activate/activateUser");


ActivateRouter.post("/activateUser",verifyRoles("admin"),isAdmin,activateUser);


module.exports = ActivateRouter;
