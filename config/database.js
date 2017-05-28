/**
  Configuration file containing Postgres config params
**/

module.exports = {

  URL : (process.env.DATABASE_URL != null) ? process.env.DATABASE_URL : 'postgres://root:root@localhost/hyp_cdm'

}
