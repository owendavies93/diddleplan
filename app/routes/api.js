'use strict';

var express = require('express');
var models  = require('../models');
var router  = express.Router();

// Testing the endpoint. Can probably be removed at some point

router.get('/', function(req, res) {
  res.json({ message: 'API endpoint' });
});

// Tasks collection

router.get('/tasks', function(req, res) {
  var before = '2000-01-01';
  var after  = '2030-01-01';

  if (req.query.before && (new Date(req.query.before)).getTime() > 0) {
    before = req.query.before;
  } else if (req.query.before) {
    res.status(400).json({ error: 'Invalid before parameter. It should be a timestamp.' });
    return;
  }

  if (req.query.after && (new Date(req.query.after)).getTime() > 0) {
    after = req.query.after;
  } else if (req.query.after) {
    res.status(400).json({ error: 'Invalid after parameter. It should be a timestamp.' });
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
  models.Task.create(req.body).then(function(newTask) {
    res.json(newTask);
  }).catch(function(e) {
    res.status(400).json(e);
  });
});

// Individual tasks

var locate_task = function(req, res, callback) {
  models.Task.findById(req.params.id).then(function(task) {
    if (task != undefined) {
      callback(task);
    } else {
      res.status(404).json({ error: "Couldn't find a task with that ID." });
    }
  }).catch(function(e) {
    res.status(500).json(e);
  });
};

router.get('/tasks/:id', function(req, res) {
  locate_task(req, res, function(task) {
    res.json(task);
  });
});

router.put('/tasks/:id', function(req, res) {
  locate_task(req, res, function(task) {
    task.update(req.body).then(function(updatedTask) {
      res.json(updatedTask);
    }).catch(function(e) {
      res.status(500).json(e);
    });
  });
});

router.delete('/tasks/:id', function(req, res) {
  locate_task(req, res, function(task) {
    task.destroy(req.body).then(function(updatedTask) {
      res.json({ message: "Deleted task." });
    }).catch(function(e) {
      res.status(500).json(e);
    });
  });
});

module.exports = router;
