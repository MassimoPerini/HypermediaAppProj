/**
  This configuration files includes the DB url to connect the application to.
  The file automatically switches from a development local database to the 
  Heroku production database, provided in the process.env.DATABASE_URL
 * @module db-config
 */
module.exports = {

  URL : (process.env.DATABASE_URL != null) ? process.env.DATABASE_URL : 'postgres://root:root@localhost/hyp_cpm'

}
