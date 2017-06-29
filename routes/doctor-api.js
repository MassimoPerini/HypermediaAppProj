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
    var service = req.param("service");     //TUTTI ID
    var area = req.param("area");
    var location = req.param("location");

    offset = offset && !isNaN(offset) && offset >= 0 ? offset : 0;
    limit = limit && !isNaN(limit) ? limit : 4;
    service = service ? service : {};
    area = area ? area : {};
    location = location ? location : {};

  //  locationFilter = (req.params.location) ? { id : req.params.location} : {};

    models.doctors.findAll({
        include: [
            {
                model: models.services,
                as: 'doctors_services',
                where: {
                    id: service
                },
                include: [
                    {
                        model: models.areas,
                        where: {
                            id: area
                        }
                    }]
            },
            {
                model: models.doctors_timetables,
                include:[{
                    model: models.locations,
                    where:{
                        id: location
                    }
                }]
            }
        ]
    });
 /* .then(function(doctors){
      console.out("ARRIVATO!!!");
      console.log("ARRIVATO!!!");
      var datas = [];
      for (;offset<limit;offset++)
      {
          datas.push(doctors[offset]);
      }
      var result = {};
      result.data = datas;
      result.count = doctors.length;
    res.send(result);
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
    }]
  }).then(function(doctor){
    res.send(doctor);
  }).catch(function(error){
    debug(error);
    next(error);
  });
});


module.exports = router;
