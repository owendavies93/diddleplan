'use strict';

var express = require('express');
var app     = express();

app.use(express.static('app'));
app.use(express.static('.tmp')); // TODO: This would be better in the gruntfile, or have a different file for dev server

app.get('/*', function(req,res) {
  res.sendFile('index.html', { root: __dirname });
});

var server = app.listen(9000, function() {
  console.log('Express sever started');
});
