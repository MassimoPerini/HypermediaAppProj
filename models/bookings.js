/**
 * Created by massimo on 02/07/17.
 */
/**
 MODEL: Inquiries
 TABLE: Inquiries
 **/
var debug = require('debug')('model');


module.exports = function(sequelize, DataTypes) {

    var bookings = sequelize.define("bookings", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'username'
            }
        },
        day: {type: DataTypes.DATEONLY, allowNull:false},
        time_slot:{type: DataTypes.ENUM('early_morning', 'late_morning','lunch','early_afternoon','late_afternoon'), allowNull: false},
        service:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'services',
                key: 'id'
            }
        },
        location:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'locations',
                key: 'id'
            }
        }
    },{
        timestamps: true,
        classMethods : {
        }
    });

    return bookings;
};
