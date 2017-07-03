/**
  This files provides all the endpoints for APIs related to Areas
  E.g. Single area and list of all areas
**/
var debug = require('debug')('api');
var express = require('express');
var models = require('../models');

var router = express.Router();

/**
 * @swagger
 * /area:
 *   get:
 *     summary: Gets all the areas
 *     tags:
 *       - Area
 *     description: Returns all areas
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of areas
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Area'
 */
router.get('/api/area', function(req, res, next){
  models.areas.findAll({})
  .then(function(areas){
    res.send(areas);
  }).catch(function(error){
    debug(error);
    next(error);
  });
});

/**
 * @swagger
 * /area/{id}:
 *   get:
 *     summary: Find an area by id
 *     tags:
 *       - Area
 *     description: Returns the single area with the id requested
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The specified area
 *         schema:
 *           $ref: '#/definitions/Area'
 *     parameters:
 *       - name: id
 *         in: path
 *         requested: true
 *         minimum: 1
 *         description: the id of the area to get.
 */
router.get('/api/area/:id', function(req, res, next){
  models.areas.findOne({
    where : { id : req.params.id }
  }).then(function(area){
    res.send(area);
  }).catch(function(error){
    debug(error);
    next(error);
  });
});


module.exports = router;
