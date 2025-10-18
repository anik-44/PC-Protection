const express = require('express');
const {uploadData} = require('../controllers/analytics.controller.js');
const {getData} = require("../controllers/analytics.controller");

const analyticsRouter = express.Router();

analyticsRouter.get('/', getData)

analyticsRouter.post('/upload', uploadData)

module.exports = analyticsRouter;


