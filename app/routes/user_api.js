'use strict';

var express  = require('express');
var models   = require('../models');
var router   = express.Router();
var passport = require('passport');

router.post('/users/register', function(req, res, next) {
  models.User.register(req.body['username'], req.body['password'], function (err, registeredUser) {
    if (err) {
      return res.json({ error: err.message });
    }

    registeredUser.stravaID = req.body.strava_id;
    registeredUser.save();

    passport.authenticate('local', function (err, user, info) {
      if (err) {
        res.status(500).send('Something went wrong');
      } else if (info) {
        res.status(401).send('Unauthorized');
      } else {
        req.login(user, function(err) {
          if (err) {
            res.status(500).send('Something went wrong');
          } else {
            res.status(200).json(user);
          }
        });
      }
    })(req, res, next);
  });
});

router.post('/users/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      res.status(500).send('Something went wrong');
    } else if (info) {
      res.status(401).send('Unauthorized');
    } else {
      req.login(user, function(err) {
        if (err) {
          res.status(500).send('Something went wrong');
        } else {
          res.status(200).send();
        }
      });
    }
  })(req, res, next);
});

function isAuthed(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.send(401);
  }
}

router.get('/users/authed', isAuthed, function (req, res) {
  res.status(200).send();
});

router.get('/users/current', isAuthed, function(req, res) {
  res.status(200).send(req.user);
});

router.put('/users', isAuthed, function(req, res) {
  models.User.findOne({
    where: { username: req.user.username }
  }).then(function(user) {
    user.update(req.body).then(function(updatedUser) {
      res.json({ user: updatedUser });
    });
  });
});

module.exports = router;
