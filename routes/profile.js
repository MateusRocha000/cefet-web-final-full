'use strict';
var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profileController');

//GET tela profile
router.get('/', profileController.index);

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

/*
//Adicionar autenticação para visualizar determinado perfil
router.get('/profile', MidAuth.isLoged, function(req, res, next) {
  //...
});
*/

module.exports = router