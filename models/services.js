/**
 * @swagger
 * definitions:
 *   Service:
 *     type: "object"
 *     required:
 *       - id
 *       - name
 *       - responsible
 *     properties:
 *       id:
 *         type: "integer"
 *       name:
 *         type: "string"
 *       description:
 *         type: "string"
 *       responsible:
 *         type: "integer"
 *         description: "The doctor's id responsible of this service"
 */

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
