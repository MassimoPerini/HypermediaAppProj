/**
  This files provides all the endpoints for APIs related to Services
  E.g. Single service and list of all services
**/
var debug = require('debug')('api');
var express = require('express');
var models = require('../models');

var router = express.Router();

/**
 * @swagger
 * /service:
 *   get:
 *     tags:
 *       - Service
 *     description: Returns all services
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of services
 */
router.get('/api/service', function(req, res, next){
  models.services.findAll({
    include: [models.areas]
  }).then(function(services){
    res.send(services);
  }).catch(function(error){
    debug(error);
    next(error);
  });
});

/**
 * @swagger
 * /service/:id:
 *   get:
 *     tags:
 *       - Service
 *     description: Returns a single service by id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The specified service
 */
router.get('/api/service/:id', function(req, res, next){
  models.services.findOne({
    where : { id : req.params.id }
  }).then(function(service){
    res.send(service);
  }).catch(function(error){
    debug(error);
    next(error);
  });
});

router.post('/api/service', function(req, res, next){
  models.services.create(req.body,{
    include: [models.doctors]
  }).then(function(service){
    res.send(service);
  }).catch(function(error){
    debug(error);
    next(error);
  });
});


module.exports = router;
