'use strict';
var express = require('express');
var router = express.Router();
var logoutController = require('../controllers/logoutController');

router.get('/', logoutController.index);

module.exports = router