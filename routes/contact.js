/**
 This files provides all the endpoints for pages related to Contact
 **/
var debug = require('debug')('content');

var express = require('express');
var models = require('../models');

var router = express.Router();

router.get('/contacts', function(req, res, next){

    models.areas.findAll({})
        .then(function(areas){
            res.render('contact', { title: 'Contatti', areas: areas});
        });

       //     res.render('contact', { title: 'Contatti'});
});


module.exports = router;
