'use strict';

module.exports = function(sequelize, DataTypes) {
  var TaskRecurrence = sequelize.define("TaskRecurrence", {
    recurrenceID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date:         { type: DataTypes.DATE, allowNull: false },
    time:         { type: DataTypes.STRING, allowNull: false }
  }, {
    classMethods: {
      associate: function(models) {
        TaskRecurrence.belongsTo(models.Task, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return TaskRecurrence;
}
