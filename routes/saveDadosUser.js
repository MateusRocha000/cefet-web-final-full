'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
const querystring = require('querystring');

//GET dados do usuario
router.get("/:json", function(req, res) {
    // res.send(User.sendWidgets(req.params.email));
     let dados = JSON.parse(decodeURIComponent(req.params.json));
    User.saveWidgets(dados, function (error, user) {
    	if (error || !user) {
      let err = new Error('Falha ao carregar o mundo do usuario.');
      // err.status = error.status;
      // return next(err);
    } else {
      // console.log(user)//userContent contem as informacoes do determinado usuario 
      return res.send("Ok");
    }
  });
  return res.send(dados.email);
})

module.exports = router