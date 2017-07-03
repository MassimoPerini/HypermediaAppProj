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
 *     summary: Gets all the services
 *     description: Returns all services in the clinic
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of services
 *         schema:
 *           type: array
 *           items:
 *             allOf:
 *               - $ref: '#/definitions/Service'
 *               - properties:
 *                   areadId:
 *                     type: integer
 *                     description: the id of the area whose the service is part of.
 *                   area:                  
 *                     $ref: '#/definitions/Area'
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
 * /service/{id}:
 *   get:
 *     tags:
 *       - Service
 *     summary: Find a service
 *     description: Returns a single service by id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The specified service
 *         schema:
 *           $ref: '#/definitions/Service'
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         minimum: 1
 *         description: the id of the service to retrivie.
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

module.exports = router;
