"use strict";
var path = require("path");

exports.index = function(req, res) {
    return res.sendFile(path.join(__dirname + '/../public/about.html'));
};
