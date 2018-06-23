'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var indexController = require('../controllers/indexController');

//GET tela index
router.get('/', indexController.index);

//POST tela index
router.post('/', indexController.cadastroLogin);

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