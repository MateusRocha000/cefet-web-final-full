'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//Tabela usuario no banco
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
  passwordConfirmation: {
    type: String,
    required: true,
  },
  background: {
    type: String
  },
  skyColor: {
    type: String
  },
  images: {
    type: String
  },
  textActive: {
    type: String
  },
  textHeight: {
    type: String
  },
  textFont: {
    type: String
  },
  textWidth: {
    type: String
  },
  textTop: {
    type: String
  },
  textLeft: {
    type: String
  },
  textBackground: {
    type: String
  },
  textColor: {
    type: String
  },
  textBorderColor: {
    type: String
  },
  textSizeBorder: {
    type: String
  },
  textBorderType: {
    type: String
  },    
  comments: {
    type: String
  },
  galleryActive: {
    type: String
  },
  links: {
    type: String
  },
  visits: {
    type: String
  },
  text: {
    type: String
}});

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

UserSchema.statics.sendWidgets = function(email,callback){
   User.findOne({ email: email })
    .exec(function (err, user) {
      return callback(user);
    });
}

UserSchema.statics.saveWidgets = function(usr,callback){
  if(usr.tipo === "sky")
  {
    console.log(usr.email);
    User.update(
       { email: usr.email },
       { $set:
          {
            background: usr.bg,
            skyColor: usr.skyColor
          }
       }
    ).exec(function (err, usr) {
       return callback(usr);
     });
  }
  else if (usr.tipo === "floor")
  {
    console.log(usr.email);
    User.update(
       { email: usr.email },
       { $set:
          {
            background: usr.bg
          }
       }
    ).exec(function (err, usr) {
       return callback(usr);
     });
  }
}

UserSchema.statics.contents = function (email, callback) {
  console.log("entrou contents");
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('usuario nao encontrado.');
        err.status = 404;
        return callback(err);
      }
      return callback(null, user);
    });
}

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

var User = mongoose.model('User', UserSchema);
module.exports = User;