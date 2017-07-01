/**
  This files provides all the endpoints for pages related to Doctors
  E.g. Single doctor and list of all doctors in A-Z order
**/
var debug = require('debug')('content');
var express = require('express');
var models = require('../models');

var router = express.Router();

router.get('/doctor', function(req, res, next){
  var locations = models.locations.findAll({});
  var areas = models.areas.findAll({});
  var services = models.services.findAll({});

  Promise.all([locations, areas, services])
  .then(function(result) {
      res.render('doctor/doctors', {title: 'Doctors', locations:result[0], areas:result[1], services:result[2], user:req.user});
  });

});

router.get('/doctor/:id', function(req, res, next){
    var data = {};
    models.doctors.findOne({
        where : { id : req.params.id },
        include: [{
          model: models.doctors_timetables,
          atributes: ['day', 'opening_time', 'closing_time'],
          include : [{
            model: models.locations,
            attributes: ['id', 'name']
          }]
        }, {
          model: models.services,
          as: 'service_responsible',
          attributes: ['id', 'name']
        },{
          model: models.areas,
          as: 'area_responsible',
          attributes: ['id', 'name', 'icon']
        }]
    }).then(function(doctor){
      res.render('doctor/doctor', { title: doctor.fullname, doctor: doctor, timetables: doctor.doctors_timetables, user:req.user});
    }).catch(function(error){
        debug(error);
        next(error);
    });
});

module.exports = router;
