"use strict";

var passportLocalSequelize = require('passport-local-sequelize');

module.exports = function(sequelize, DataTypes) {
  var User = passportLocalSequelize.defineUser(sequelize, {
    stravaID: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    stravaAuthToken: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Task)
      }
    }
  });

  return User;
}
