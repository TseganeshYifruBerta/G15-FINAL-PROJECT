// routes.js
const express = require("express");
const executionRouter = express.Router();
// code execution
const {countAcceptedSubmissions , getAllAcceptedSubmissions} = require("../../controller/codeExecution/Acceptedsubmission")
const { codeExecute}= require("../../controller/codeExecution/codeExecution")
const { execute } = require("../../controller/codeExecution/codeSubmission");
const {
    countSubmissionsForDate,
    countSubmissionsForDateByUserId,
  } = require("../../controller/codeExecution/specificDates")

// fetching difficulty tag counts
const getAllDifficultyData= require("../../controller/codeExecution/manageCodeSubmittedData")
const countSubmissionsForLastWeek = require("../../controller/codeExecution/countSubmissionPerWeek")
const submitExamAnswerByStudent = require("../../controller/exam/submittedExamAnswer/submittedStudentsExamAnswer");
const { isStudent } = require("../../middleware/roleMiddleWare");
const  verifyRoles  = require("../../middleware/verifyRoles");
const {
   fetchingAllSubmittedQuestionForUser,
   fetchingAllDetailForSubmittedQuestion,
   countAcceptedSubmissionsForUser,
   countAcceptedSubmissionsOfUserBySection
 } = require("../../controller/QuestionUploaderController/submittedData");
const {isTeacher} = require("../../middleware/roleMiddleWare");

executionRouter.post("/submit",  verifyRoles("student"),isStudent,execute);
executionRouter.post("/run", codeExecute); 

executionRouter.get("/getSubmittedDifficulty/:userId", getAllDifficultyData);

executionRouter.get("/countSubmissionsForDate/:date",countSubmissionsForDate);
executionRouter.get("/countSubmissionsForDateByUserId/:userId/:date",countSubmissionsForDateByUserId)
executionRouter.get("/countAcceptedSubmissions" ,countAcceptedSubmissions )
executionRouter.get("/getAllAcceptedSubmissions" , getAllAcceptedSubmissions )
executionRouter.get("/countSubmissionsForLastWeek/:initialDateString" , countSubmissionsForLastWeek )
executionRouter.post("/submitExamAnswerByStudent", submitExamAnswerByStudent);


                  // submitted code data
executionRouter.get("/countAcceptedSubmissionsOfUserBySection/:section", verifyRoles("teacher"),isTeacher,countAcceptedSubmissionsOfUserBySection);


executionRouter.get(
  "/fetchSubmittedQuestionById/:userId",
  fetchingAllSubmittedQuestionForUser

);  

executionRouter.get(
  "/fetchQuestionDetailBySubmittedId/:submittedId",
  fetchingAllDetailForSubmittedQuestion
);  
executionRouter.get("/countAcceptedSubmissionsForUser/:userId",countAcceptedSubmissionsForUser)


module.exports = executionRouter;
