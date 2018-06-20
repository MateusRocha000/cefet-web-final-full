"use strict";
var express = require('express');
var app = express();
var session = require('express-session');

var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

var bodyParser = require('body-parser');

//conexão ao banco MongoDB
mongoose.connect('mongodb://localhost/waifuWeb');
var db = mongoose.connection;

//Erro no mongo
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

//Usando sessões para rastrear o login 
app.use(session({
  secret: 'waifus irao dominieren the bce welt 758463582347',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from template
//app.use(express.static(__dirname + '/templateLogReg'));
app.use(express.static(__dirname + '/public'));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});