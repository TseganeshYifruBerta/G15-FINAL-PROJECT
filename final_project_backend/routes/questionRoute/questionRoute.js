const express = require("express");
const questionRouters = express.Router();
const {submitQuestionWithTestCases} = require('../../controller/QuestionUploaderController/submitQuestionWithTestCases')
const {
  getAllQuestions,
  getNumberOfAllQuestion,
  getAllQuestionsCreatedByTeacher,
  getNumberOfAllQuestionsCreatedByTeacher,
  getNumberOfQuestionByDifficulty

  
} = require("../../controller/QuestionUploaderController/fetch_all_question");
const  editQuestion  = require("../../controller/QuestionUploaderController/manageQuestion/EditQuestion");
const  deleteQuestion = require("../../controller/QuestionUploaderController/manageQuestion/deleteQuestion");
const  DetailOfSelectedQuestion = require("../../controller/QuestionUploaderController/DetailOfSelectedQuestion");
const verifyRoles = require("../../middleware/verifyRoles");
const {isTeacher} = require("../../middleware/roleMiddleWare");
const {AddTestcases,DeleteTestcases} = require("../../controller/QuestionUploaderController/manageQuestion/manageTestCases")




questionRouters.post("/submitquestion", submitQuestionWithTestCases);

questionRouters.get("/getAllQuestions", getAllQuestions); 
questionRouters.get("/getAllQuestionsCreatedByTeacher/:teacherId", getAllQuestionsCreatedByTeacher); 
questionRouters.get("/getNumberOfAllQuestionsCreatedByTeacher/:teacherId", getNumberOfAllQuestionsCreatedByTeacher); 
questionRouters.get("/getNumberOfAllQuestion", getNumberOfAllQuestion);
questionRouters.get("/getNumberOfQuestionByDifficulty", getNumberOfQuestionByDifficulty);


questionRouters.get("/DetailOfSelectedQuestion/:questionId",DetailOfSelectedQuestion);

 
questionRouters.put("/updateQuestionById/:id/:teacherId", verifyRoles("teacher"),isTeacher, editQuestion)
questionRouters.delete("/deleteQuestionById/:id/:teacherId",  verifyRoles("teacher"),isTeacher,deleteQuestion)


questionRouters.post("/AddTestcases",AddTestcases);
questionRouters.delete("/DeleteTestcases/:testCasesId",DeleteTestcases);




module.exports = questionRouters;