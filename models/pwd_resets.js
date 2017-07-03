/**
 * @swagger
 * definitions:
 *   Pwd_reset:
 *     description: Object definition that enables users to change password for their accounts.
 *     type: object
 *     required:
 *       - id
 *       - token
 *     properties:
 *       id:
 *         type: integer
 *       token:
 *         type: string
 */

var debug = require('debug')('model');
var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {

    var Pwd_reset = sequelize.define("pwd_resets", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {type: DataTypes.STRING, allowNull: false}
    },{
        timestamps: true,
        hooks: {

          // BeforeCreate hook generates the token automatically
          beforeCreate: function(instance, options){
            instance.token = crypto.randomBytes(64).toString('hex');
          }

        },
        classMethods: {

          associate: function(models){
            Pwd_reset.belongsTo(models.users);
          }

        }
    });

    return Pwd_reset;
};
