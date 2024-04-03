// plagiarismRoutes.js
const express = require('express');

const plagiarismRouter = express.Router();

const checkPlagiarsm = require('../../controller/plagiarism/plagiarism_checker');

plagiarismRouter.get('/checkPlagiarsm/:userId/:questionId', checkPlagiarsm);


module.exports = plagiarismRouter;
