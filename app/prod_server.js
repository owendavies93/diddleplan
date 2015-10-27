'use strict';

var express = require('express');
var app     = express();

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var session      = require('cookie-session');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');

var models       = require('./models');
var task_api     = require('./routes/task_api');
var exercise_api = require('./routes/exercise_api');
var web          = require('./routes/web');
var user_api     = require('./routes/user_api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'foobar'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/styles',  express.static(__dirname + '/styles'));
app.use('/views',   express.static(__dirname + '/views'));

passport.use(models.User.createStrategy());
passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());

app.use('/api', task_api);
app.use('/api', exercise_api);
app.use('/api', user_api);
app.use('/', web);

var server = app.listen(9000, function() {
  console.log('Express sever started');
});
