"use strict";
var express = require('express');
var router = express.Router();
var aboutController = require('../controllers/aboutController');

//GET tela about
router.get('/', aboutController.index);

module.exports = router