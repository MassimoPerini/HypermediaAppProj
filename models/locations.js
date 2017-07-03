/**
 * @swagger
 * definitions:
 *   Location:
 *     type: "object"
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: "integer"
 *       name:
 *         type: "string"
 *       header:
 *         type: "string"
 *         description: "Path of the location photo"
 *       position:
 *         type: "string"
 *       description:
 *         type: "string"
 *       htgt:
 *         type: "object"
 *         description: "\"How to get there\" object. Contains informations about directions."
 *         properties:
 *           ways:
 *             description: "all the way to arrive to this location"
 *             type: "array"
 *             items:
 *               title: "Transportation"
 *               type: "object"
 *               properties:
 *                 kind:
 *                   type: "string"
 *                   enum:
 *                     - bus
 *                     - car
 *                     - tube
 *                 info:
 *                   description: "directions"
 *                   type: "string"
 *           gMapsDicrectionsURL:
 *             type: "integer"
 *             description: "link to the page directions on Google maps"
 *       gMaps:
 *         type: "string"
 *         description: "URL of the frame containing the map from Google"
 *       tell:
 *         type: "string"
 *       email:
 *         type: "string"
 *         format: 'email'
 */

var debug = require('debug')('model');

module.exports = function(sequelize, DataTypes) {

  var locations = sequelize.define("locations", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
 	  name: {type: DataTypes.STRING, allowNull: false},
    header: DataTypes.STRING,
    position: DataTypes.STRING,
    description: DataTypes.STRING,
    htgt: DataTypes.TEXT,
    gMaps: DataTypes.STRING(350),
    tell: DataTypes.STRING(15),
    email: DataTypes.STRING
  },{
  	timestamps: true,
    classMethods : {}
  });

  return locations;
};
