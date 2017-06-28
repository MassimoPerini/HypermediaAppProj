/**
  This files provides all the endpoints for pages related to Areas
  E.g. Single area and list of all areas
**/
var debug = require('debug')('content');
var express = require('express');
var models = require('../models');

var router = express.Router();

router.get('/area', function(req, res, next){
  models.areas.findAll({})
  .then(function(areas){
    res.render('area/areas', { title: 'Areas', areas: areas});
  });
});

router.get('/area/:id', function(req, res, next){
    models.areas.findOne({
        where : { id : req.params.id },
        include : models.services
    }).then(function(area) {
      res.render('area/area', { title: area.name + ' Area', area: area });
    }).catch(function(error){
        debug(error);
        next(error);
    });
});

module.exports = router;
