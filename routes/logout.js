'use strict';
var express = require('express');
var router = express.Router();
var logoutController = require('../controllers/logoutController');

//GET para logout do sistema
router.get('/', logoutController.index);

module.exports = router