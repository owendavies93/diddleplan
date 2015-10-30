'use strict';

module.exports = function(sequelize, DataTypes) {
  var SpecialTask = sequelize.define("SpecialTask",  {
    specialTaskID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name:          { type: DataTypes.STRING, allowNull: false },
    date:          { type: DataTypes.DATE, allowNull: false }
  }, {
    indexes: [{
        name: 'name-date-unique',
        unique: true,
        method: 'BTREE',
        fields: ['name', 'date']
    }]
  });

  return SpecialTask;
}
