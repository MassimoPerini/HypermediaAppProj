/**
 * @swagger
 * definitions:
 *   Area:
 *     type: "object"
 *     description: "Describes a single area"
 *     required:
 *       - id
 *       - name
 *       - responsible
 *     properties:
 *       id:
 *         type: "integer"
 *       name:
 *         type: "string"
 *       icon:
 *         type: "string"
 *         description: "Path of the area icon image"
 *       responsible:
 *         type: "integer"
 *         description: "The id of the doctor responsible for this area"
 */
var debug = require('debug')('model');

module.exports = function(sequelize, DataTypes) {

  var Areas = sequelize.define("areas", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
 	  name: {type: DataTypes.STRING, allowNull: false},
    icon: DataTypes.STRING,
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
    classMethods : {}
  });

  return Areas;
};
