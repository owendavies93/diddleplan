'use strict';

var express = require('express');
var models  = require('../models');
var router  = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'API endpoint' });
});

router.get('/tasks', function(req, res) {
  var before = '2000-01-01';
  var after  = '2030-01-01';

  if (req.query.before && (new Date(req.query.before)).getTime() > 0) {
    before = req.query.before;
  } else if (req.query.before) {
    res.json({ error: 'Invalid before parameter. It should be a timestamp.' });
    return;
  }

  if (req.query.after && (new Date(req.query.after)).getTime() > 0) {
    after = req.query.after;
  } else if (req.query.after) {
    res.json({ error: 'Invalid after parameter. It should be a timestamp.' });
    return;
  }

  models.Task.findAll({
    where: {
      $or: [
        { date: { $between: [before, after] } },
        { date: null }
      ]
    },
    include: [models.User]
  }).then(function(tasks) {
    res.json(tasks);
  });
});

router.post('/tasks', function(req, res) {
  return models.Task.create(req.body);
});

module.exports = router;
