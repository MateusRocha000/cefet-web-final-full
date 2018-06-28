'use strict';
var express = require('express');
var router = express.Router();
var creatorsController = require('../controllers/creatorsController');

router.get('/', creatorsController.index);

module.exports = router