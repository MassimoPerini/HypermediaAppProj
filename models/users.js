/**
    MODEL : Users
    TABLE: Users
**/
var debug = require('debug')('model');

var sha1 = require('sha1');

module.exports = function(sequelize, DataTypes) {

  var users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      nullable: false
    },
 	  name: DataTypes.STRING,
    surname: DataTypes.STRING,
    cf: DataTypes.STRING
  },{
  	timestamps: true,
    classMethods : {
    },
    hooks: {

      beforeCreate: function(instance, options){
        //Hash password with SHA1 before inserting
        instance.password = sha1(instance.password);
      }

    }
  });

  return users;
};
