// plagiarismRoutes.js
const express = require('express');

const plagiarismRouter = express.Router();

const checkPlagiarsm = require('../../controller/plagiarism/plagiarism_checker');

plagiarismRouter.get('/checkPlagiarsm/:examId', checkPlagiarsm);


module.exports = plagiarismRouter;
