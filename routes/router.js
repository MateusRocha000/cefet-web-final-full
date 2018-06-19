var express = require('express');
var router = express.Router();
var User = require('../models/user');
var MidAuth = require('../middleware/authenticationRequired');
var AuthController = require('../controllers/authController');

// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});
//router.get('/', AuthController.loadIndex(req, res, next)); ERROR, REQ NOT DEFINED :(

//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConfirmation) {
    let err = new Error('Senhas nao coincidem.');
    err.status = 400;
    res.send("Senhas nao coincidem");
    return next(err);
  }

  if (req.body.email && req.body.username && req.body.password && req.body.passwordConfirmation) {
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

// GET route after registering
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

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
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
//Add authentication required to view personal pages
router.get('/profile', MidAuth.isLoged, function(req, res, next) {
  //...
});
*/

module.exports = router;