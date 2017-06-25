/**
    MODEL : Services
    TABLE: Services
**/
var debug = require('debug')('model');

module.exports = function(sequelize, DataTypes) {

  var services = sequelize.define("services", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
 	  name: DataTypes.STRING,
    description: DataTypes.TEXT,
    responsible: {
      type: DataTypes.INTEGER,
      references: {
        model: 'doctors',
        key: 'id'
      }
    }
  },{
  	timestamps: true,
    classMethods : {
    }
  });

  return services;
};
