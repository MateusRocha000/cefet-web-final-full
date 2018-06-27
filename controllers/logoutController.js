'use strict';
var path = require("path");

exports.index = function(req, res, next) {
    if (req.session) {
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.sendFile(path.join(__dirname + '/../public/index.html'));
        }
      });
    }
};