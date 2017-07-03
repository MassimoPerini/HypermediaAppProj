/**
 * @swagger
 * definitions:
 *   User:
 *     type: "object"
 *     description: "User account for private section"
 *     required:
 *       - username
 *       - password
 *       - mail
 *     properties:
 *       username:
 *         type: "string"
 *       password:
 *         type: "string"
 *         format: "password"
 *       mail:
 *         type: "string"
 *         format: 'email'
 *       name:
 *         type: "string"
 *       surname:
 *         type: "string"
 *       cf:
 *         type: "string"
 */

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
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false
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
      },

      beforeUpdate: function(instance, options){
        //Hash password with SHA1 before inserting
        instance.password = sha1(instance.password);
      }

    }
  });

  return users;
};
