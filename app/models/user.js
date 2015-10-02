"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false }
  }, {});

  return User;
}
