/**
    MODEL : Locations
    TABLE: Locations
**/
var debug = require('debug')('model');

module.exports = function(sequelize, DataTypes) {

  var locations = sequelize.define("locations", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
 	  name: DataTypes.STRING,
    icon: DataTypes.STRING,
    header: DataTypes.STRING,
    position: DataTypes.STRING,
    description: DataTypes.STRING,
    htgt: DataTypes.STRING
  },{
  	timestamps: true,
    classMethods : {
    }
  });

  return locations;
};
