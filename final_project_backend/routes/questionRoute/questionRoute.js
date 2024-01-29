const express = require("express");
const questionRouters = express.Router();
const {submitQuestionWithTestCases} = require('../../controller/QuestionUploaderController/questionController')
const {
  getAllQuestions,
  getAllQuestionsById,
  getNumberOfAllQuestion,
  
} = require("../../controller/QuestionUploaderController/fetch_all_question");
const { editQuestion } = require("../../controller/QuestionUploaderController/manageQuestion/EditQuestion");
const { deleteQuestion } = require("../../controller/QuestionUploaderController/manageQuestion/deleteQuestion");

 const {
   fetchingAllSubmittedQuestionForUser,
   fetchingAllDetailForSubmittedQuestion,
   countAcceptedSubmissionsForUser,
 } = require("../../controller/QuestionUploaderController/submittedData");
 
// questionRouters.post("/question", submitQuestionWithTestCases);
questionRouters.post("/submitquestion", submitQuestionWithTestCases);
questionRouters.get("/getAllQuestions", getAllQuestions); 
questionRouter.get("/getNumberOfAllQuestion", getNumberOfAllQuestion);
questionRouters.get("/getAllQuestionsById/:userId/:questionId", getAllQuestionsById);   
questionRouters.put("/updateQuestionById/:questionId", editQuestion)
questionRouters.delete("/deleteQuestionById/:questionId", deleteQuestion)
questionRouters.get(
  "/fetchSubmittedQuestionById/:userId",
  fetchingAllSubmittedQuestionForUser

);  

questionRouters.get(
  "/fetchQuestionDetailBySubmittedId/:submittedId",
  fetchingAllDetailForSubmittedQuestion
);  
questionRouters.get("/countAcceptedSubmissionsForUser/:userId",countAcceptedSubmissionsForUser)


module.exports = questionRouters;