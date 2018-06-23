"use strict";
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var MidAuth = require('../middleware/authenticationRequired');
var MidUserVer = require('../middleware/userVerified');

//GET tela inicial
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/public/index.html'));
});

//POST cadastro de novo usuario ou login de um já existente
router.post('/', function (req, res, next) {
  if (req.body.email && req.body.username && req.body.password && req.body.passwordConfirmation) {
    if (req.body.password !== req.body.passwordConfirmation) {
      let err = new Error('Senhas nao coincidem.');
      err.status = 400;
      res.send("Senhas nao coincidem");
      return next(err);
    }

    let userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        let err = new Error('Email e/ou senha errados.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    let err = new Error('Todos campos sao requeridos.');
    err.status = 400;
    return next(err);
  }
})

//GET acesso ao perfil individual
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
          return res.send('<h1>Nome: </h1>' + user.username + '<h2>Email: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

//GET para logout do sistema
router.get('/logout', function (req, res, next) {
  if (req.session) {
    //Deleta o objeto da sessão no logout
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

/*
//Adicionar autenticação para visualizar determinado perfil
router.get('/profile', MidAuth.isLoged, function(req, res, next) {
  //...
});
*/

module.exports = router;