var express = require('express');
var models = require('../models');

var router = express.Router();

/**
 * @swagger
 * /locations:
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns all locations
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of locations
 */
router.get('/locations', function(req, res, next) {
  res.send([
    {
      id: 1,
      name: 'Via Mascheronzoli'
    }
  ]);
});

/**
 * @swagger
 * /doctors:
 *   get:
 *     tags:
 *       - Doctors
 *     description: Returns all doctors
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of doctors
 */
router.get('/doctors', function(req, res, next){
  models.doctors.findAll({})
  .then(function(doctors){
    res.send(doctors);
  });
});

module.exports = router;
