"use strict";
var express = require('express');
var router = express.Router();

//GET tela criadores
router.get('/', function(req, res) {
    return res.sendFile(path.join(__dirname + '/public/creators.html'));
})

module.exports = router