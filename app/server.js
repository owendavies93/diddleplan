'use strict';

var express    = require('express');
var app        = express();
var models     = require('./models');
var fixtures   = require('sequelize-fixtures');
var bodyParser = require('body-parser');
var api_router = require('./api_routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('app'));
app.use(express.static('.tmp'));

app.use('/api', api_router);

app.get('/diddleplan', function(req,res) {
  res.sendFile('index.html', { root: __dirname });
});

models.sequelize.sync().then(function () {
  fixtures.loadFile(__dirname + '/config/test_data.json', models).then(function(){
    var server = app.listen(9000, function() {
      console.log('Express sever started');
    });
  });
});
