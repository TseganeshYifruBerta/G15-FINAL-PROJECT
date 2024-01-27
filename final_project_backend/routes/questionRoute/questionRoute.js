const express = require("express");
const questionRouters = express.Router();
const {submitQuestionWithTestCases} = require('../../controller/QuestionUploaderController/questionController')
const {
  getAllQuestions,
  getAllQuestionsById,
} = require("../../controller/QuestionUploaderController/fetch_all_question");


// questionRouters.post("/question", submitQuestionWithTestCases);
questionRouters.post("/submitquestion", submitQuestionWithTestCases);
questionRouters.get("/getAllQuestions", getAllQuestions);   
questionRouters.get("/getAllQuestionsById/:userId/:questionId", getAllQuestionsById);   

module.exports = questionRouters;