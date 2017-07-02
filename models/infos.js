/**
 * @swagger
 * definitions:
 *   Info:
 *     type: "object"
 *     description: "?"
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: "integer"
 *       title:
 *         type: "string"
 *       text:
 *         type: "string"
 *       icon:
 *         type: "string"
 *       header:
 *         type: "string"
 */

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
