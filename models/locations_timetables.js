/**
    MODEL : Locations_timetables
    TABLE: Locations_timetables
**/

var debug = require('debug')('model');

module.exports = function(sequelize, DataTypes) {

  var locations_timetables = sequelize.define('locations_timetables', {
    location_id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true,
      references: {
        model: 'locations',
        key: 'id'
      }
    },
    day: {
      type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
      primaryKey: true
    },
    opening_time: DataTypes.STRING,
    closing_time: DataTypes.STRING
  },{
    timestamps: true,
    classMethods : {
    }
  });

  return locations_timetables;

};
