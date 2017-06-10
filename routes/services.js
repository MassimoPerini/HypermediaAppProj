/**
 * Created by massimo on 10/06/17.
 */
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
