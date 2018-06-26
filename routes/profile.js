'use strict';
var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profileController');

//GET tela profile
router.get('/', profileController.index);

module.exports = router