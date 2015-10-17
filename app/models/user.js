"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false },
    stravaId: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Task)
      }
    }
  });

  return User;
}
