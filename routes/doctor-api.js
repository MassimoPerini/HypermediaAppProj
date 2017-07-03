/**
  This files provides all the endpoints for APIs related to Doctors
  E.g. Single doctor and list of all doctors
**/
var debug = require('debug')('api');
var express = require('express');
var models = require('../models');

var router = express.Router();

const DEFAULT_PAGE_SIZE = 12;

/**
 * @swagger
 * /doctor:
 *   get:
 *     summary: Gets all doctors
 *     tags:
 *       - Doctor
 *     description: Returns all doctors, with the possibility to filter them by service, by area and by location. Further is also possible the retrieve a certain page of doctors using the paging parameters.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: query
 *         description: "[Pagin parameter] The index of the page requested."
 *         type: integer
 *         minimum: 0
 *         required: false
 *       - name: pagesize
 *         in: query
 *         description: "[Paging parameter] The number of doctor per page."
 *         type: integer
 *         minimum: 0
 *         required: false
 *       - name: service
 *         in: query
 *         description: "[Filter parameter] The id of the service to get all the doctors that operate in that service."
 *         type: integer
 *         minimum: 1
 *         required: false
 *       - name: area
 *         in: query
 *         description: "[Filter parameter] The id of the area to get all the doctors working in."
 *         type: integer
 *         minimum: 1
 *         required: false
 *       - name: location
 *         in: query
 *         description: "[Filter parameter] The id of the location to get all the doctors working in."
 *         type: integer
 *         minimum: 1
 *         required: false
 *     responses:
 *       200:
 *         description: "Succesful operation: all the doctors satisfying the parameters."
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Doctor'   
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
    var serviceQuery = (service) ? {id : service} : null;
    var locationQuery = (location) ? {id : location} : {};
    var areaQuery = (area) ? {id: area} : {};
    // Get all doctors, apply pagination after
    // FIXME: sequelize has a broken findAndCountAll that is faster than manual pagination,
    // but is bugged.
    debug(serviceQuery);
    models.doctors.findAll({
      include:[{
        model: models.services,
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
        data: doctors.slice(page * pagesize, (page+1) * pagesize),
        page: page
      });
    }).catch(function(error){
      debug(error);
      next(error);
    });
});

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get a doctorr
 *     tags:
 *       - Doctor
 *     description: Returns a single doctor by id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the doctor to search.
 *         type: integer
 *         required: true
 *         minimum: 1
 *     responses:
 *       200:
 *         description: The specified doctor
 *         schema:
 *           $ref: '#/definitions/Doctor'
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
      model: models.services,
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
