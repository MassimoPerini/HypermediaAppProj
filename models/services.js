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
 	  name: {type: DataTypes.STRING, allowNull: false},
    description: DataTypes.TEXT,
    responsible: {
      type: DataTypes.INTEGER,
        allowNull: false,
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
