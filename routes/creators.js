"use strict";
var express = require('express');
var router = express.Router();
var creatorsController = require('../controllers/creatorsController');

//GET tela creators
router.get('/', creatorsController.index);

module.exports = router