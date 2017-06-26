/**
  This files provides all the endpoints for APIs related to Doctors
  E.g. Single doctor and list of all doctors
**/
var debug = require('debug')('api');
var express = require('express');
var models = require('../models');

var router = express.Router();

/**
 * @swagger
 * /doctor:
 *   get:
 *     tags:
 *       - Doctor
 *     description: Returns all doctors
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of doctors
 */
router.get('/api/doctor', function(req, res, next){

    var offset = req.param("offset");
    var limit = req.param("limit");
    var campo_service_da_input = 1;

    offset = offset && !isNaN(offset) ? offset : 0;
    limit = limit && !isNaN(limit) ? limit : 4;

  //  locationFilter = (req.params.location) ? { id : req.params.location} : {};

    models.doctors.findAll({
        offset: offset,
        limit: limit,
        include: [{
            model: models.services,
            as: 'doctors_services'
        },{
            model: models.services,
            as: 'responsible'
        }]
    })
  .then(function(doctors){
    res.send(doctors);
  }).catch(function(error){
    debug(error);
    next(error);
  });
});

/**
 * @swagger
 * /doctors/:id:
 *   get:
 *     tags:
 *       - Doctor
 *     description: Returns a single doctor by id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The specified doctor
 */
router.get('/api/doctor/:id', function(req, res, next){
  models.doctors.findOne({
    where : { id : req.params.id },
    include : [{
      model: models.doctors_timetables,
      atributes: ['day', 'opening_time', 'closing_time'],
      include : [{
        model: models.locations,
        attributes: ['id', 'name']
      }]
    }]
  }).then(function(doctor){
    res.send(doctor);
  }).catch(function(error){
    debug(error);
    next(error);
  });
});


module.exports = router;
