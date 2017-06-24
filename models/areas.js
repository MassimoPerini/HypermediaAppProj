/**
    MODEL : Areas
    TABLE: Areas
**/
var debug = require('debug')('model');

module.exports = function(sequelize, DataTypes) {

  var areas = sequelize.define("areas", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
 	  name: DataTypes.STRING,
    icon: DataTypes.STRING,
    header: DataTypes.STRING,
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

  return areas;
};
