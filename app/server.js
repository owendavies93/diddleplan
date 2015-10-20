'use strict';

var express      = require('express');
var app          = express();
var fixtures     = require('sequelize-fixtures');

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
app.use(express.static('app'));
app.use(express.static('.tmp'));

passport.use(models.User.createStrategy());
passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());

app.use('/api', task_api);
app.use('/api', exercise_api);
app.use('/api', user_api);
app.use('/diddleplan', web);

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

models.sequelize.sync({ force: true }).then(function () {
  fixtures.loadFile(__dirname + '/config/test_data.json', models).then(function(){
    var server = app.listen(9000, function() {
      console.log('Express sever started');
    });
  });
});
