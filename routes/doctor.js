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

module.exports = router;
