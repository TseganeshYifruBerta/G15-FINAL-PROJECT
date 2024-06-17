const express = require("express");
const InfoRouter = express.Router();
// const activateUser = require("../../controller/userAuthorization/userLogin");

const {getNumberOfAllQuestion,numberAllUser} = require("../../controller/info/fetchAllData");

InfoRouter.get("/getNumberOfAllQuestion",getNumberOfAllQuestion);
InfoRouter.get("/numberAllUser",numberAllUser);



module.exports = InfoRouter;
