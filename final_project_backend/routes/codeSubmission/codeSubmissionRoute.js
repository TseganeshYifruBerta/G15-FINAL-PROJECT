// routes.js
const express = require("express");
const codeSubmissionRouter = express.Router();
const getAllAcceptedSubmissionsByUserId = require("../../controller/codeSubmission/Acceptedsubmission")
const {submitCode} = require("../../controller/codeSubmission/codeSubmission")
const verifyRoles = require("../../middleware/verifyRoles");
const {isStudent, isTeacher} = require("../../middleware/roleMiddleWare");
const countCodeSubmissionsForLastWeek = require("../../controller/codeSubmission/countCodeSubmissionPerWeek") 
const {
    countAcceptedSubmissionsPerUser,
    countAcceptedSubmissionsOfUserBySection
  } = require("../../controller/codeSubmission/countAcceptedSubmissions");


codeSubmissionRouter.get("/getAllAcceptedSubmissions/:userId", getAllAcceptedSubmissionsByUserId);
codeSubmissionRouter.post("/submitCode", verifyRoles("student"),isStudent,submitCode);
codeSubmissionRouter.get("/countCodeSubmissionsForLastWeek/:initialDateString/:userId",verifyRoles("teacher"),isTeacher, countCodeSubmissionsForLastWeek);
codeSubmissionRouter.get("/countAcceptedSubmissionsOfUserBySection/:section", verifyRoles("teacher"),isTeacher,countAcceptedSubmissionsOfUserBySection);
codeSubmissionRouter.get("/countAcceptedSubmissionsPerUser/:userId",countAcceptedSubmissionsPerUser)








module.exports = codeSubmissionRouter;
