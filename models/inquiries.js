/**
 * @swagger
 * definitions:
 *   Inquiry:
 *     type: "object"
 *     description: "?"
 *     required:
 *       - id
 *       - name
 *       - surname
 *       - phone
 *       - mail
 *       - target
 *       - obj
 *       - message
 *     properties:
 *       id:
 *         type: "integer"
 *       name:
 *         type: "string"
 *       surname:
 *         type: "string"
 *       phone:
 *         type: "string"
 *       mail:
 *         type: "string"
 *       target:
 *         type: "string"
 *       obj:
 *         type: "string"
 *       message:
 *         type: "string"
 */
var debug = require('debug')('model');


module.exports = function(sequelize, DataTypes) {

    var inquiries = sequelize.define("inquiries", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {type: DataTypes.STRING, allowNull: false},
        surname: {type: DataTypes.STRING, allowNull: false},
        phone: {type: DataTypes.STRING, allowNull: true},
        mail: {type: DataTypes.STRING, allowNull: false},
        target: {type: DataTypes.STRING, allowNull: true},
        obj: {type: DataTypes.STRING, allowNull: false},
        message: {type: DataTypes.STRING, allowNull: false}
    },{
        timestamps: true,
        classMethods : {
        }
    });

    return inquiries;
};
