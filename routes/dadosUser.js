'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get("/:email", function(req, res) {
    User.contents(req.params.email, function (error, user) {
    	if (error || !user) {
      let err = new Error('Falha ao carregar o mundo do usuario.');
      err.status = error.status;
      return next(err);
    } else {
      console.log(user)//userContent contem as informacoes do determinado usuario 
      return res.send(user);
    }
  });
})

module.exports = router