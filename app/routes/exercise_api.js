'use strict';

var express = require('express');
var models  = require('../models');
var router  = express.Router();
var strava  = require('strava-v3')(__dirname + '/../config/strava_config.json');

router.get('/exercises', function(req, res) {
  res.json({ message: 'API endpoint for exercises' });
});

router.get('/exercises/auth/:username', function(req, res) {
  var reqURL = strava.oauth.getRequestAccessURL({ scope: 'view_private' });
  res.redirect(reqURL);
});

router.get('/exercises/authed/', function(req, res) {
  strava.oauth.getToken(req.query.code,function(err,payload) {
    console.log(payload);
  });
});

router.get('/exercises/:username', function(req, res) {
  models.Task.findOne({
    where: { taskType: 'exercise' },
    include: [{
      model: models.User,
      where: { username: req.params.username }
    }],
    order: [[models.sequelize.fn('max', models.sequelize.col('Task.date')), 'DESC']]
  }).then(function (task) {
    var from_timestamp = null;
    var stravaID = task.User.stravaID;
    try {
      from_timestamp = new Date(task.date).getTime();
    } catch (err) {
      // This probably means no exercises with dates for :username
      console.log(err);
    }

    strava.athlete.listActivities({ id: stravaID }, function(e, result) {
      if (e) {
        res.status(500).json({ error: e });
      } else {
        res.json(result);
      }
    });
  });
});

module.exports = router;
