/**
  This files provides all the endpoints for APIs related to Doctors
  E.g. Single doctor and list of all doctors
**/
var debug = require('debug')('api');
var express = require('express');
var models = require('../models');

var router = express.Router();

const DEFAULT_PAGE_SIZE = 6;

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
    // Paging parameters
    var page = req.query["page"];
    var pagesize = req.query["pagesize"];
    page = page && !isNaN(page) && page >= 0 ? Number(page) : 0;
    pagesize = pagesize && !isNaN(pagesize) ? Number(pagesize) : DEFAULT_PAGE_SIZE;
    // Filtering parameters, ids of chosen filters
    var service = req.query["service"];
    var area = req.query["area"];
    var location = req.query["location"];
    var serviceQuery = (service) ? {id : service} : {};
    var locationQuery = (location) ? {id : location} : {};
    var areaQuery = (area) ? {id: area} : {};
    // Get all doctors, apply pagination after
    // FIXME: sequelize has a broken findAndCountAll that is faster than manual pagination,
    // but is bugged.
    models.doctors.findAll({
      include:[{
        model: models.services,
        as: 'doctors_services',
        where: serviceQuery,
        attributes: [],
        include: [{
          model: models.areas,
          where: areaQuery,
          attributes: []
        }]
      },{
        model: models.doctors_timetables,
        attributes: [],
        include: [{
          model: models.locations,
          attributes: [],
          where: locationQuery
        }]
      }],
      order: 'surname ASC'
    }).then(function(doctors){
      res.send({
        count: doctors.length,
        data: doctors.slice(page * pagesize, (page+1) * pagesize)
      });
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
    },{
      model: models.services,
      as: 'service_responsible',
      attributes: ['id', 'name']
    },{
      model: models.areas,
      as: 'area_responsible',
      attributes: ['id', 'name', 'icon']
    }]
  }).then(function(doctor){
    res.send(doctor);
  }).catch(function(error){
    debug(error);
    next(error);
  });
});


module.exports = router;
