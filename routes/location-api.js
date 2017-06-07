var debug = require('debug')('api');

var express = require('express');
var models = require('../models');

var router = express.Router();

router.get('/api/location', function(req, res, next) {
    models.locations.findAll({})
    .then(function(locations){
        res.send(locations);
    }).catch(function(error) {
        debug(error);
        next(error);
    });
});

router.get('/api/location/:id', function(req, res, next) {
    models.locations.findOne({
        where : {id : req.params.id}
    }).then(function(location) {
        res.send(location);
    }).catch(function(error) {
        debug(error);
        next(error);
    })
});

module.exports = router;