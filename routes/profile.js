'use strict';
var express = require('express');
var router = express.Router();
var path = require("path");
var User = require('../models/user');

//GET tela profile individual
router.get('/', function (req, res, next) {
  console.log(req.session.userId)//req.session.userId = undefined ... por isso nao encontro nada no banco
  User.contents(req.body.logemail, function (error, userContent) {
    if (error || !userContent) {
      let err = new Error('Falha ao carregar o mundo do usuario.');
      err.status = error.status;
      return next(err);
    } else {
      console.log(userContent)//userContent contem as informacoes do determinado usuario 
      return res.sendFile(path.join(__dirname + '/../public/mundoUsuario.html'));
    }
  });
});

//GET acesso ao perfil individual
/*
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          let err = new Error('Sem autorizacao.');
          err.status = 400;
          return next(err);
        } else {
         // return res.send('<h1>Nome: </h1>' + user.username + '<h2>Email: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
         return res.redirect('/profile');
        }
      }
    });
});
*/

/*
//Adicionar autenticação para visualizar determinado perfil
router.get('/profile', MidAuth.isLoged, function(req, res, next) {
  //...
});
*/

module.exports = router