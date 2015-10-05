'use strict';

var express = require('express');
var router  = express.Router();

router.get('/diddleplan', function(req,res) {
  res.sendFile('index.html', { root: __dirname });
});

module.exports = router;
