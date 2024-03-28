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
const {fetchingAllAcceptedSubmittedQuestionsPerUser , fetchingDetailForAcceptedSubmittedQuestion} = require("../../controller/codeSubmission/countAcceptedSubmissions");
const getAllDifficultyDataPerUser = require("../../controller/codeSubmission/getAllDifficultyDataPerUser")
const fetchTopSolvedQuestions = require("../../controller/codeSubmission/topSolvedQuestions")
const getTopStudents = require("../../controller/codeSubmission/topStudents")


codeSubmissionRouter.get("/getAllAcceptedSubmissions/:userId", getAllAcceptedSubmissionsByUserId);
codeSubmissionRouter.post("/submitCode", verifyRoles("student"),isStudent,submitCode);
codeSubmissionRouter.get("/countCodeSubmissionsForLastWeek/:initialDateString/:userId",verifyRoles("teacher"),isTeacher, countCodeSubmissionsForLastWeek);
codeSubmissionRouter.get("/countAcceptedSubmissionsOfUserBySection/:section", verifyRoles("teacher"),isTeacher,countAcceptedSubmissionsOfUserBySection);
codeSubmissionRouter.get("/countAcceptedSubmissionsPerUser/:userId",countAcceptedSubmissionsPerUser)
codeSubmissionRouter.get("/getAllDifficultyDataPerUser/:id",verifyRoles("student"),isStudent,getAllDifficultyDataPerUser)


                  // top solved questions and top students 
codeSubmissionRouter.get("/fetchTopSolvedQuestions",fetchTopSolvedQuestions) 
codeSubmissionRouter.get("/getTopStudents",getTopStudents)



codeSubmissionRouter.get(
  "/fetchingAllAcceptedSubmittedQuestionsPerUser/:userId",
  fetchingAllAcceptedSubmittedQuestionsPerUser

);  

codeSubmissionRouter.get(
  "/fetchQuestionDetailBySubmittedId/:userId/:submittedId",
  fetchingDetailForAcceptedSubmittedQuestion
); 






module.exports = codeSubmissionRouter;
