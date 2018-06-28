'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

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
    type: Number
  },
  text: {
    type: String
}});

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
  else if (usr.tipo === "gallery")
  {
    console.log(usr.email);
    User.update(
       { email: usr.email },
       { $set:
          {
            links: usr.links,
            comments: usr.comments,
            galleryActive: usr.galleryActive
          }
       }
    ).exec(function (err, usr) {
       return callback(usr);
     });
  }
  else if (usr.tipo === "box")
  {
    console.log(usr.email);
    User.update(
       { email: usr.email },
       { $set:
          {
            textActive: usr.textActive,
            textHeight: usr.textHeight,
            textFont: usr.textFont,
            textWidth: usr.textWidth,
            textTop: usr.textTop,
            textLeft: usr.textLeft,
            textBackground: usr.textBackground,
            textColor: usr.textColor,
            textBorderColor: usr.textBorderColor,
            textSizeBorder: usr.textSizeBorder,
            textBorderType: usr.textBorderType,
            text: usr.text
          }
       }
    ).exec(function (err, usr) {
       return callback(usr);
     });
  }
  else if (usr.tipo === "drag")
  {
    console.log(usr.email);
    User.update(
       { email: usr.email },
       { $set:
          {
            textTop: usr.textTop,
            textLeft: usr.textLeft
          }
       }
    ).exec(function (err, usr) {
       return callback(usr);
     });
  }
  else if (usr.tipo === "visits")
  {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      User.update(
       { email: usr.email },
       { $inc:
          {
            visits: 1
          }
       }
    ).exec(function (err, usr) {
        console.log(usr);
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

UserSchema.statics.visitor = function (username, callback) {
  console.log("entrou visitor");
  User.findOne({ username: username })
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