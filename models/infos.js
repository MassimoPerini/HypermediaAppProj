/**
    MODEL : Infos
    TABLE: Infos
**/
var debug = require('debug')('model');

module.exports = function(sequelize, DataTypes) {

  var infos = sequelize.define("infos", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
 	  text: DataTypes.STRING,
    icon: DataTypes.STRING,
    header: DataTypes.STRING
  },{
  	timestamps: true,
    classMethods : {
    }
  });

  return infos;
};
