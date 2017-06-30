/**
  This files provides all the endpoints for pages related to Locations
  E.g. Single location and list of all locations
**/
var debug = require('debug')('content');
var express = require('express');
var models = require('../models');

var router = express.Router();

router.get('/location', function(req, res, next){
  models.locations.findAll({})
  .then(function(locations){
    res.render('location/locations', { title: 'Locations', locations: locations, user:req.user});
  });
});

router.get('/location/:id', function(req, res, next){
  var data = {};
  models.locations.findOne({
    where : { id : req.params.id },
    include: models.locations_timetables
  }).then(function(location) {
    res.render('location/location', { title: 'Location ' + location.name, location: location, timetables: location.locations_timetables, user:req.user});
  }).catch(function(error){
    debug(error);
    next(error);
  });
});

router.get('/location/:id/gallery', function(req, res, next) {
  models.locations.findOne({
    where : { id : req.params.id }
  }).then(function(location){
    res.render('location/gallery', { title: 'Photo Gallery of ' + location.name, location: location, user:req.user});
  });
});

router.get('/location/:id/how-to-get-there', function(req, res, next) {
  models.locations.findOne({
    where : { id : req.params.id }
  }).then(function(location){
    res.render('location/htgt', { title: 'How to get to ' + location.name, location: location, htgt: JSON.parse(location.htgt), user:req.user});
  });
});

router.get('/location/:id/available-services', function(req, res, next) {
  models.locations.findOne({
    where : { id : req.params.id },
    include : models.services
  }).then(function (location) {
    res.render('location/available-services', { title: 'Available services in ' + location.name, location : location, user:req.user});
  }).catch(function(error){
    debug(error);
    next(error);
  });
});

module.exports = router;
