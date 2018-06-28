'use strict';
var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profileController');

//GET tela profile
router.get('/', profileController.index);

router.get('/:username', function (req, res, next) {
    console.log(req.params.username)
    User.visitor(req.params.username, function (error, user) {
    if (error || !user) {
        let err = new Error('Falha ao carregar o mundo do usuario.');
        err.status = error.status;
        return next(err);
    } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
    }
  }); 
});

module.exports = router