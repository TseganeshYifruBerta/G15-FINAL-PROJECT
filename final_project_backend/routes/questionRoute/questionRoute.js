const express = require("express");
const questionRouters = express.Router();
const {submitQuestionWithTestCases} = require('../../controller/QuestionUploaderController/submitQuestionWithTestCases')
const {
  getAllQuestions,
  getNumberOfAllQuestion,
  getAllQuestionsCreatedByTeacher,
  getNumberOfAllQuestionsCreatedByTeacher

  
} = require("../../controller/QuestionUploaderController/fetch_all_question");
const  editQuestion  = require("../../controller/QuestionUploaderController/manageQuestion/EditQuestion");
const  deleteQuestion = require("../../controller/QuestionUploaderController/manageQuestion/deleteQuestion");
const  DetailOfSelectedQuestion = require("../../controller/QuestionUploaderController/DetailOfSelectedQuestion");
const verifyRoles = require("../../middleware/verifyRoles");
const {isTeacher} = require("../../middleware/roleMiddleWare");

questionRouters.post("/submitquestion", verifyRoles("teacher"),isTeacher,submitQuestionWithTestCases);

questionRouters.get("/getAllQuestions", getAllQuestions); 
questionRouters.get("/getAllQuestionsCreatedByTeacher/:teacherId", getAllQuestionsCreatedByTeacher); 
questionRouters.get("/getNumberOfAllQuestionsCreatedByTeacher/:teacherId", getNumberOfAllQuestionsCreatedByTeacher); 
questionRouters.get("/getNumberOfAllQuestion", getNumberOfAllQuestion);



questionRouters.get("/DetailOfSelectedQuestion/:questionId",verifyRoles("teacher"),isTeacher, DetailOfSelectedQuestion);

 
questionRouters.put("/updateQuestionById/:id/:teacherId", verifyRoles("teacher"),isTeacher, editQuestion)
questionRouters.delete("/deleteQuestionById/:id/:teacherId",  verifyRoles("teacher"),isTeacher,deleteQuestion)



module.exports = questionRouters;