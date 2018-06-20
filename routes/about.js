"use strict";
var express = require('express');
var router = express.Router();

//GET tela sobre
router.get('/', function(req, res) {
    return res.sendFile(path.join(__dirname + '/public/about.html'));
})

module.exports = router