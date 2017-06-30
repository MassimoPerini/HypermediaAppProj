/**
  This files provides all the endpoints for APIs related to Doctors
  E.g. Single doctor and list of all doctors
**/
var debug = require('debug')('api');
var express = require('express');
var models = require('../models');

var router = express.Router();

const DEFAULT_PAGE_SIZE = 4;

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
    var page = req.param("page");
    var pagesize = req.param("pagesize");
    page = page && !isNaN(page) && page >= 0 ? Number(page) : 0;
    pagesize = pagesize && !isNaN(pagesize) ? Number(pagesize) : DEFAULT_PAGE_SIZE;
    // Filtering parameters, ids of chosen filters
    var service = req.param("service");
    var area = req.param("area");
    var location = req.param("location");
    var serviceQuery = (service) ? {id : service} : {};
    var locationQuery = (location) ? {id : location} : {};
    var areaQuery = (area) ? {id: area} : {};
    // Initally getting doctors size


    models.doctors.findAndCountAll({
      offset: page * pagesize,
      limit: pagesize,
      order: 'surname ASC',
      include:[{
        model: models.services,
        as: 'doctors_services',
        where: serviceQuery,
        required: (service == true)
      }]
    }).then(function(doctors){
      res.send(doctors);
    }).catch(function(error){
      debug(error);
      next(error);
    });

    /*
    var serviceQuery = {};
    var locationQuery = {};
    var areaQuery = {};

    if (service) {
        serviceQuery =
            {
                id: service
            }
    }
    if (location)
    {
        locationQuery =
            {
                id: location
            }
    }
    if (area)
    {
        areaQuery =
            {
                id: area
            }
    }

    //  locationFilter = (req.params.location) ? { id : req.params.location} : {};

    models.doctors.findAll({
        include: [
            {
                model: models.services,
                attributes: [],
                as: 'doctors_services',
                where: serviceQuery,
                include: [
                    {
                        model: models.areas,
                        attributes: [],
                        where: areaQuery
                    }]
            },
            {
                model: models.doctors_timetables,
                attributes: [],
                include:[{
                    model: models.locations,
                    attributes: [],
                    where:locationQuery
                }]
            }
        ]
    })
  .then(function(doctors){
      var datas = [];
      maxSize = Number(limit)+Number(offset);
      if (maxSize >= doctors.length)
          maxSize = doctors.length;
      for (;offset<maxSize ;offset++)
      {
          datas.push(doctors[offset]);
      }
      var result = {};
      result.data = datas;
      result.count = doctors.length;
      var send = JSON.stringify(result);
    res.send(send);
  }).catch(function(error){
    debug(error);
    next(error);
  });*/
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
      attributes: ['id', 'name']
    }]
  }).then(function(doctor){
    res.send(doctor);
  }).catch(function(error){
    debug(error);
    next(error);
  });
});


module.exports = router;
