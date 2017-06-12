var debug = require('debug')('content');

var express = require('express');
var models = require('../models');

var router = express.Router();

router.get('/location', function(req, res, next){
  models.locations.findAll({})
  .then(function(locations){
    res.render('location/locations', { title: 'Locations', locations: locations});
  });
});

router.get('/location/:id', function(req, res, next){
  models.locations.findOne({
    where : { id : req.params.id }
  }).then(function(location){
    res.render('location/location', { title: 'Location ' + location.name, location: location});
  });
});

router.get('/location/:id/gallery', function(req, res, next) {
  models.locations.findOne({
    where : { id : req.params.id }
  }).then(function(location){
    res.render('location/gallery', { title: 'Photo Gallery of ' + location.name, location: location});
  });
});

router.get('/location/:id/how-to-arrive', function(req, res, next) {
  models.locations.findOne({
    where : { id : req.params.id }
  }).then(function(location){
    res.render('location/htgt', { title: 'How to get to ' + location.name, location: location});
  });
});

router.get('/location/:id/available-services', function(req, res, next) {
  //TODO
});

module.exports = router;
