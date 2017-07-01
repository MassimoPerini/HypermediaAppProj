/**
 * Created by massimo on 29/06/17.
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
