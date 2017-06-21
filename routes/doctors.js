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
        where : { id : req.params.id }
    }).then(function(doctor){
        data.doctor = doctor;
        models.doctors_timetables.findAll({
          where : { doctor_id : doctor.id }
        }).then(function(timetables) {
          res.render('doctor', { title: data.doctor.fullname, doctor: data.doctor, timetables: timetables});
        });
    }).catch(function(error){
        debug(error);
        next(error);
    });
});

module.exports = router;
