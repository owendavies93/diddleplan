"use strict";

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    name:          { type: DataTypes.STRING, allowNull: false },
    task_type:     { type: DataTypes.ENUM('todo', 'exercise', 'meal', 'meeting', 'other'), allowNull: false, defaultValue: 'other' },
    date:          { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    moveable:      { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 1 },
    auto_moveable: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null }
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
