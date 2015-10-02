'use strict';

var express = require('express');
var app     = express();

app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/styles',  express.static(__dirname + '/styles'));
app.use('/views',   express.static(__dirname + '/views'));

app.get('/*', function(req,res) {
  res.sendFile('index.html', { root: __dirname });
});

var server = app.listen(9000, function() {
  console.log('Express sever started');
});
