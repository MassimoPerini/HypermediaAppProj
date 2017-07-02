/**
  This files provides all the endpoints for pages related to Services
  E.g. Single service and list of all service
**/
var debug = require('debug')('content');

var express = require('express');
var models = require('../models');

var router = express.Router();

router.get('/service', function(req, res, next){
    models.services.findAll({})
        .then(function(services){
            res.render('service/services', { title: 'Services', services: services, user:req.user});
        });
});

router.get('/service/:id', function(req, res, next){
    models.services.findOne({
        where : { id : req.params.id },
        include : [{
          model : models.areas,
          attributes : ['name', 'icon']
        }, {
          model : models.locations,
          attributes : ['id', 'name']
        }]
    }).then(function(service){
        res.render('service/service', { title: service.name, service: service, user:req.user});
    }).catch(function(error){
        debug(error);
        next(error);
    });
});

router.get('/service/:id/operating-doctors', function(req, res, next){
  models.services.findOne({
    where : { id : req.params.id },
    include : [{
      model : models.areas,
      attributes : ['name', 'icon']
    }, {
        model : models.doctors
    }]
  }).then(function(service) {
    res.render('service/operating-doctors', { title: 'Doctors operating in ' + service.name, service: service, user:req.user});
  }).catch(function(error) {
    debug(error);
    next(error);
  });
});

router.get('/service/:id/instrumentations', function(req, res, next) {
    models.services.findOne({
        where : { id : req.params.id}
    }).then(function(service){
        res.render('service/instrumentations', { title: 'Instrumentation of ' + service.name, service: service, user:req.user});
    }).catch(function(error) {
        debug(error);
        next(error);
    });
});

module.exports = router;
