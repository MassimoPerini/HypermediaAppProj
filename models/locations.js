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
 	  name: {type: DataTypes.STRING, allowNull: false},
    icon: DataTypes.STRING,
    header: DataTypes.STRING,
    position: DataTypes.STRING,
    description: DataTypes.STRING,
    htgt: DataTypes.STRING,
    gMaps: DataTypes.STRING(350),
    tell: DataTypes.STRING(15),
    email: DataTypes.STRING
  },{
  	timestamps: true,
    classMethods : {}
  });

  return locations;
};
