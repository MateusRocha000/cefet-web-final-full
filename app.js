"use strict";
var express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var routes = require('./routes/router');

//conexão ao banco MongoDB
mongoose.connect('mongodb://localhost/WaifusEngineeringBros');
var db = mongoose.connection;

//Mongo
db.on('error', console.error.bind(console, 'Erro na conexao com o db:'));
db.once('open', function () {
  console.log("db funcionando.")
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

//Caminho dos arquivos de exibicao
app.use(express.static(__dirname + '/public'));

//Rotas
app.use('/', routes);

//Recebe requisições  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: false 
}));

//Error handler (lida com o querido 404)
app.use(function (req, res, next) {
  let err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

//Error handler (definido como o ultimo app.use callback)
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

//Escutando na porta 3000
app.listen(3000, function () {
  console.log('Express app escutando na porta 3000...');
});