/**
 * @swagger
 * definitions:
 *    Doctor:
 *      type: "object"
 *      required:
 *        - id
 *        - fullname
 *      properties:
 *        id:
 *          type: "integer"
 *        fullname:
 *          type: "string"
 *        surname:
 *          type: "string"
 *        icon:
 *          type: 'string'
 *          description: "path of the doctor's picture"
 *        position:
 *          type: 'string'
 *          description: "covered in the hospital"
 *        phone:
 *          type: 'string'
 *        email:
 *          type: 'string'
 *        description:
 *          type: 'string'
 */
var debug = require('debug')('model');

module.exports = function(sequelize, DataTypes) {

  var doctors = sequelize.define("doctors", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
 	  fullname: {type: DataTypes.STRING, allowNull: false},
    surname: DataTypes.STRING,
    icon: DataTypes.STRING,
    header: DataTypes.STRING,
    position: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.TEXT
  },{
  	timestamps: true,
    classMethods : {
    }
  });

  return doctors;
};
