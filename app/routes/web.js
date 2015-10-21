'use strict';

var express = require('express');
var path    = require('path');
var router  = express.Router();

function isAuthed(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).redirect('login');
  }
}

function checkAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.status(302).redirect('diddleplan');
  }
}

router.get('/diddleplan', isAuthed, function(req, res) {
  res.sendFile(path.resolve('app/index.html'));
});

router.get('/login', checkAuth, function(req, res) {
  res.sendFile(path.resolve('app/index.html'));
});

module.exports = router;
