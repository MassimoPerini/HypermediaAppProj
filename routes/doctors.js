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
    models.doctors.findOne({
        where : { id : req.params.id }
    }).then(function(doctor){
        res.render('doctor', { title: doctor.fullname, doctor: doctor});
    }).catch(function(error){
        debug(error);
        next(error);
    });
});

module.exports = router;
