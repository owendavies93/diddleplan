'use strict';

var express  = require('express');
var models   = require('../models');
var router   = express.Router();
var passport = require('passport');
var strava   = require('strava-v3')(__dirname + '/../config/strava_config.json');

function isAuthed(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/api/users/login');
}

router.get('/exercises/auth', isAuthed, function(req, res) {
  var reqURL = strava.oauth.getRequestAccessURL({ scope: 'view_private' });
  res.redirect(reqURL);
});

router.get('/exercises/authed', isAuthed, function(req, res) {
  if (!req.query.code) {
    res.status(400).json({ error: "No access token provided" });
  }

  strava.oauth.getToken(req.query.code,function(err, payload) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      models.User.update({
        stravaAuthToken: payload.access_token
      }, {
        where: { username: req.user.username }
      }).then(function(updatedTask) {
        res.json({ message: "Authed user with Strava" });
      });
    }
  });
});

router.get('/exercises/', isAuthed, function(req, res) {
  models.Task.findOne({
    where: { taskType: 'exercise' },
    include: [{
      model: models.User,
      where: { username: req.user.username }
    }],
    order: [[models.sequelize.col('Task.date'), 'DESC']]
  }).then(function (task) {
    var stravaID  = null;
    var authToken = null;

    try {
      stravaID  = task.User.stravaID;
      authToken = task.User.stravaAuthToken;
    } catch (err) {
      // task is probably null (no exercises for that user)
      // can fall back to the session variables though
      stravaID  = req.user.stravaID;
      authToken = req.user.stravaAuthToken;
    }

    if (!authToken) {
      // Need to auth the user with this app on Strava
      res.redirect('/api/exercises/auth');
    }

    var from_timestamp = null;

    try {
      from_timestamp = new Date(task.date).getTime();
    } catch (err) {
      // This probably means no exercises with dates for :username
      console.log(err);
    }

    // Get activities that we don't already know about
    strava.athlete.listActivities({
      id: stravaID,
      access_token: authToken,
      after: from_timestamp
    }, function(err, result) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        for (var i = 0; i < result.length; i++) {
          var r    = result[i];
          var d    = new Date(r.start_date_local);
          var ts   = d.getTime();
          var time = d.getHours() + ":" + d.getMinutes();

          models.Task.create({
            name: r.name,
            taskType: 'exercise',
            date: ts,
            time: time,
            moveable: false,
            autoMoveable: false,
            description: '',
            stravaID: r.id,
            UserId: req.user.id
          });
        }

        var size = result.length || 0;

        return res.status(200).json({ message: "Added " + size + " activities"});
      }
    });
  });
});

module.exports = router;
