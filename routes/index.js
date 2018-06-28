'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var indexController = require('../controllers/indexController');

//GET tela index
router.get('/', indexController.index);

//POST tela index
router.post('/', function (req, res, next) {
  if (!req.body || req.body === undefined) {
    let err = new Error('Erro na requisicao.');
    err.status = 400;
    res.send("Erro na requisicao");
    return next(err);
  }

  if (req.body.email && req.body.username && req.body.password && req.body.passwordConfirmation) {
    if (req.body.password !== req.body.passwordConfirmation) {
      let err = new Error('Senhas não coincidem.');
      err.status = 400;
      res.send("Senhas não coincidem");
      return next(err);
    }

    let userNow = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
      background: "",
      skyColor: "",
      links: "",
      comments: "",
      galleryActive: "",
      images: "",
      textActive: "",
      textHeight: "",
      textFont: "",
      textWidth: "",
      textTop: "",
      textLeft: "",
      textBackground: "",
      textColor: "",
      textBorderColor: "",
      textSizeBorder: "",
      textBorderType: "",
      visits: 0,
      text: ""
    }

    User.create(userNow, function (error, user) {
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
    let err = new Error('Todos campos são requeridos.');
    err.status = 400;
    return next(err);
  }
});

// Como passar os dados de usuário para o profileController?

//GET acesso ao perfil individual
/*router.get('/profile', function (req, res, next) {
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
});*/

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