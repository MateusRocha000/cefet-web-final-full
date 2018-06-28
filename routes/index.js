'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var indexController = require('../controllers/indexController');

router.get('/', indexController.index);

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

module.exports = router;