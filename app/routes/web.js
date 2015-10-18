'use strict';

var express = require('express');
var path    = require('path');
var router  = express.Router();

router.get('/', function(req, res) {
  console.log(req.user);
  res.sendFile(path.resolve('app/index.html'));
});

module.exports = router;
