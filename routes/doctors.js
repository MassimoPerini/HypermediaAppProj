/**
  This files provides all the endpoints for pages related to Doctors
  E.g. Single doctor and list of all doctors in A-Z order
**/
var debug = require('debug')('content');
var express = require('express');
var models = require('../models');

var router = express.Router();

router.get('/doctor', function(req, res, next){
  models.doctors.findAll({})
  .then(function(doctors){
    res.render('doctors', { title: 'Dottori', doctors: doctors});
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
        }]
    }).then(function(doctor){
      res.render('doctor', { title: doctor.fullname, doctor: doctor, timetables: doctor.doctors_timetables});
    }).catch(function(error){
        debug(error);
        next(error);
    });
});

module.exports = router;
