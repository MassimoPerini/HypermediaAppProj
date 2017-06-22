/**
    MODEL: Doctors_timetables
    TABLE: Doctors_timetables
**/

var debug = require('debug')('model');

module.exports = function(sequelize, DataTypes) {

  var doctors_timetables = sequelize.define('doctors_timetables', {
    doctor_id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true,
      references: {
        model: 'doctors',
        key: 'id'
      }
    },
    day: {
      type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
      primaryKey: true
    },
    working_location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'locations',
        key: 'id'
      }
    },
    opening_time: DataTypes.STRING,
    closing_time: DataTypes.STRING
  },{
    timestamps: true,
    classMethods : {
    }
  });

  return doctors_timetables;

};
