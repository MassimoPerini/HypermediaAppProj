/**
  This files provides all the endpoints for APIs related to Locations
  E.g. Single location and list of all locations
**/
var debug = require('debug')('api');
var express = require('express');
var models = require('../models');

var router = express.Router();

/**
 * @swagger
 * /location:
 *   get:
 *     summary: Gets all the locations.
 *     tags:
 *       - Location
 *     description: Returns all locations
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All the locations in the clinic
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Location'
 */
router.get('/api/location', function(req, res, next) {
    models.locations.findAll({})
    .then(function(locations){
        res.send(locations);
    }).catch(function(error) {
        debug(error);
        next(error);
    });
});

/**
 * @swagger
 * /location/{id}:
 *   get:
 *     tags:
 *       - Location
 *     summary: Find a location
 *     description: Returns a single location by id.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The specified location
 *         schema:
 *           $ref: '#/definitions/Location'
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         minimum: 1
 *         description: the id of the location to get.
 */
router.get('/api/location/:id', function(req, res, next) {
    models.locations.findOne({
        where : {id : req.params.id},
        include : [{
            model: models.locations_timetables,
            attributes: ['day', 'opening_time', 'closing_time']
        }]
    }).then(function(location) {
        res.send(location);
    }).catch(function(error) {
        debug(error);
        next(error);
    })
});

module.exports = router;
