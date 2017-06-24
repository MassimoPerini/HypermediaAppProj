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
            res.render('services', { title: 'Servizi', services: services});
        });
});

router.get('/service/:id', function(req, res, next){
    models.services.findOne({
        where : { id : req.params.id }
    }).then(function(service){
        res.render('service', { title: service.name, service: service});
    }).catch(function(error){
        debug(error);
        next(error);
    });
});

module.exports = router;
