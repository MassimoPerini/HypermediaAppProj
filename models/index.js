/**
  Index file to initialize all the sequelize classes (aka DB tables)
**/
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var debug     = require("debug")('model');

var DB_CONFIG = require("../config/database.js");

var sequelize = new Sequelize(DB_CONFIG.URL,{
  logging : debug,
  dialectOptions:{
    ssl: DB_CONFIG.URL.endsWith('?ssl=true')
  }
});

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

/* ASSOCIATIONS SETUP */
// Service belongs to an area
db.services.belongsTo(db.areas);
db.areas.hasMany(db.services);
// Area responsible
db.doctors.hasOne(db.areas, {foreignKey: 'responsible', as: 'area_responsible'});
// Service responsible
db.doctors.hasOne(db.services, {foreignKey: 'responsible', as: 'service_responsible'});
// Location - Areas
db.locations.belongsToMany(db.areas, {through: 'locations_areas'});
db.areas.belongsToMany(db.locations, {through: 'locations_areas'});
// Locations - Services
db.locations.belongsToMany(db.services, { through: 'locations_services'});
db.services.belongsToMany(db.locations, { through: 'locations_services'});
// Services - Doctors
db.doctors.belongsTo(db.services, {constraints: false});
db.services.hasMany(db.doctors, {constraints: false});
// Doctors - Doctors timetables
db.doctors.hasMany(db.doctors_timetables, { foreignKey : 'doctor_id'});
// Locations - Locations timetables
db.locations.hasMany(db.locations_timetables, {foreignKey: 'location_id'});
// Location
db.doctors_timetables.belongsTo(db.locations, { foreignKey : 'working_location_id'});
// Location-Services
db.locations.belongsToMany(db.services, {through: 'locations_services'});
db.services.belongsToMany(db.locations, {through: 'locations_services'});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
