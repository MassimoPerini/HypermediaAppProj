var debug = require('debug')('api');

var express = require('express');
var models = require('../models');

var router = express.Router();

/**
 * @swagger
 * /area:
 *   get:
 *     tags:
 *       - Area
 *     description: Returns all areas
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of areas
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
 * /area/:id:
 *   get:
 *     tags:
 *       - Area
 *     description: Returns a single area by id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The specified area
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
