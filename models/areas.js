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
 	  name: {type: DataTypes.STRING, allowNull: false},
    icon: DataTypes.STRING,
    header: DataTypes.STRING,
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

  return areas;
};
