'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
const querystring = require('querystring');

router.get("/:json", function(req, res) {

     let dados = JSON.parse(decodeURIComponent(req.params.json));
    User.saveWidgets(dados, function (error, user) {
    	if (error || !user) {
      let err = new Error('Falha ao carregar o mundo do usuario.');
    } else {
      return res.send("Ok");
    }
  });
  return res.send(dados.email);
})

module.exports = router