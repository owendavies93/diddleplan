"use strict";

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    taskID:       { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name:         { type: DataTypes.STRING, allowNull: false },
    taskType:     { type: DataTypes.ENUM('todo', 'exercise', 'meal', 'meeting', 'other'), allowNull: false, defaultValue: 'other' },
    date:         { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    time:         { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    moveable:     { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    autoMoveable: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    description:  { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    stravaID:     { type: DataTypes.INTEGER, allowNull: true, defaultValue: null }
  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Task;
}
