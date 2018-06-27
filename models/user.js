'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//Tabela usuario
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  floor: {
    type: String
  },
  sky: {
    type: String
  },
  image: {
    type: String
  },
  textNote: {
    type: String
  }
});

//Realiza o hashing da senha antes de salvar ela no banco
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

//Autenticação da entrada sobre o banco
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('usuario nao encontrado.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

UserSchema.statics.contents = function (email, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('usuario nao encontrado.');
        err.status = 404;
        return callback(err);
      }

      let userContent = {
        floor: user.floor,
        sky: user.sky,
        image: user.image,
        textNote: user.textNote
      }
      return callback(null, userContent);
    });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;