const express = require("express");
const questionRouters = express.Router();
const {submitQuestionWithTestCases} = require('../../controller/QuestionUploaderController/questionController')
const {
  getAllQuestions,
  getAllQuestionsById,
} = require("../../controller/QuestionUploaderController/fetch_all_question");
const { editQuestion } = require("../../controller/QuestionUploaderController/manageQuestion/EditQuestion");
const { deleteQuestion } = require("../../controller/QuestionUploaderController/manageQuestion/deleteQuestion");

 const {
   fetchingAllSubmittedQuestionForUser,
   fetchingAllDetailForSubmittedQuestion,
 } = require("../../controller/QuestionUploaderController/submittedData");
 
// questionRouters.post("/question", submitQuestionWithTestCases);
questionRouters.post("/submitquestion", submitQuestionWithTestCases);
questionRouters.get("/getAllQuestions", getAllQuestions);   
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


module.exports = questionRouters;