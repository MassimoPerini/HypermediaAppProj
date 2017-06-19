/**
  This file is customly run to init DB. It creates a fresh new DB containing
  all the tables defined by sequelize in the "model" directory.
  Then, it loads the contents of the "data" directory (JSONs) and loads each of
  them in the corresponding table.
**/

var models = require('./models');
var debug = require('debug')('model');

/*
  TABLES to fetch from files are listed here, in order
*/
var tablesToFetch = ['locations', 'locations_timetables' 'areas', 'doctors', 'service', 'users', 'infos']

async function executeSequentially(promises) {
    for (const promise of promises) {
        await promise;
    }
    return true;
}

debug("Updating schema...");
return models.sequelize.sync({ force : true })
.then(function(err){
  debug("DB schema is up-to-date");
  debug("Loading data...");
  var promises = [];
  tablesToFetch.forEach((table) => {
    try {
      var datas = require('./data/' + table + '.json');
      promises.push(models[table].bulkCreate(datas,{
        individualHooks: true
      }));
    }catch(err){
      debug('Did not find data for ' + table);
    }
  });
  return executeSequentially(promises);
}).then(function(results){
  debug('Data loaded.');
  debug('DB ready, buckle up!');
  process.exit(0);
}).catch(function(err){
  debug('Error syncing DB: ' + err);
  process.exit(1);
});
