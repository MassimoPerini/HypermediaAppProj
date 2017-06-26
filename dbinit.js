/**
  This file is customly run to init DB. It creates a fresh new DB containing
  all the tables defined by sequelize in the "model" directory.
  Then, it loads the contents of the "data" directory (JSONs) and loads each of
  them in the corresponding table.
**/

var models = require('./models');
var debug = require('debug')('model');

async function loadData(){
  // Load table and files

  /* LOCATIONS */
  var locations = require('./data/locations.json');
  await models.locations.bulkCreate(locations);
  /* LOCATION TIMETABLES */
  var locations_timetables = require('./data/locations_timetables.json');
  await models.locations_timetables.bulkCreate(locations_timetables);
  /* DOCTORS */
  var doctors = require('./data/doctors.json');
  await models.doctors.bulkCreate(doctors);
  /* DOCTORS TIMETABLES */
  var doctors_timetables = require('./data/doctors_timetables.json');
  await models.doctors_timetables.bulkCreate(doctors_timetables);
  /* AREAS */
  var areas = require('./data/areas.json');
  await models.areas.bulkCreate(areas);
  /* SERVICE */
  var services = require('./data/services.json');
  await models.services.bulkCreate(services);
  /* USERS */
  var users = require('./data/users.json');
  await models.users.bulkCreate(users, { individualHooks: true });
  /* INFOS */
  var infos = require('./data/infos.json');
  await models.infos.bulkCreate(infos);
  /* LOCATIONS-AREAS */
  for (var area of areas){
    if (area.locations) {
      var _area = await models.areas.findById(area.id);
      await _area.setLocations(area.locations);
    }
  }
  /* LOCATION-SERVICES */
  for (var service of services){
    if (service.locations){
      var _service = await models.services.findById(service.id);
      await _service.setLocations(service.locations);
    }
  }
  /* DOCTORS-SERVICES */
  for (var service of services){
    if (service.doctors){
      var _service = await models.services.findById(service.id);
      await _service.setDoctors_services(service.doctors);
    }
  }
  // End function
  return true;
}

debug("Updating schema...");
return models.sequelize.sync({ force : true })
.then(function(err){
  debug("DB schema is up-to-date");
  debug("Loading data...");
  return loadData();
}).then(function(results){
  debug('Data loaded.');
  debug('DB ready, buckle up!');
  process.exit(0);
}).catch(function(err){
  debug('Error syncing DB: ' + err);
  process.exit(1);
});
