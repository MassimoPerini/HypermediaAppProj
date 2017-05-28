/**
    MODEL : Doctors
    TABLE: Doctos
**/
var debug = require('debug')('model');

module.exports = function(sequelize, DataTypes) {

  var doctors = sequelize.define("doctors", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
 	  fullname: DataTypes.STRING,
    position: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    icon: DataTypes.STRING,
    header: DataTypes.STRING
  },{
  	timestamps: true,
    classMethods : {
    }
  });

  return doctors;
};
