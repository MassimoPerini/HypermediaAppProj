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
        name: {type: DataTypes.STRING, nullable: false},
        surname: {type: DataTypes.STRING, nullable: false},
        phone: {type: DataTypes.STRING, nullable: true},
        mail: {type: DataTypes.STRING, nullable: false},
        target: {type: DataTypes.STRING, nullable: false},
        obj: {type: DataTypes.STRING, nullable: false},
        message: {type: DataTypes.STRING, nullable: false}
    },{
        timestamps: true,
        classMethods : {
        }
    });

    return inquiries;
};
