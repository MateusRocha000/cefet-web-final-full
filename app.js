'use stric'
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var index = require('./routes/index');
var about = require('./routes/about');
var creators = require('./routes/creators');
var profile = require('./routes/profile');
var dadosUser = require('./routes/dadosUser');
var saveDadosUser = require('./routes/saveDadosUser');
var logout = require('./routes/logout');

//MongoDB
mongoose.connect('mongodb://localhost/WaifusEngineeringBros');
//mongoose.connect('mongodb://craviee:lol999@ds121331.mlab.com:21331/waifusengineeringbros');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexao com o db:'));
db.once('open', function () {
  console.log("db funcionando...")
});

//Sessões para rastrear o login 
app.use(session({
  secret: 'waifus irao dominieren the bce welt 758463582347',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//Requisições  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: false 
}));

//Rotas
app.use(express.static(__dirname + '/public'));
app.use('/', index);
app.use('/about', about);
app.use('/creators', creators);
app.use('/profile', profile);
app.use('/dadosUser', dadosUser);
app.use('/saveDadosUser', saveDadosUser);
app.use('/logout', logout);

//Error handler
app.use(function (req, res, next) {
  let err = new Error('Arquivo nao encontrado');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

//Escutando na porta 3000
app.listen(3000, function () {
//app.listen(process.env.PORT || 5000, function () {
  console.log('Express app escutando na porta 3000...');
});