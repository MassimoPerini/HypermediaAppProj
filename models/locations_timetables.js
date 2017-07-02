/**
 * @swagger
 * definitions:
 *   Location_timetable:
 *     description: "It represents the time schedule of locations with respect to days, closing and opening time."
 *     type: "object"
 *     required:
 *       - location_id
 *       - day
 *     properties:
 *       location_id:
 *         type: "integer"
 *       day:
 *         type: "string"
 *         enum:
 *           - Monday
 *           - Tuesday
 *           - Wednesday
 *           - Thursday
 *           - Friday
 *           - Saturday
 *           - Sunday
 *       opening_time:
 *         type: "string"
 *       closing_time:
 *         type: "string"
 */

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
