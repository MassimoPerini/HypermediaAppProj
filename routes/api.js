var express = require('express');

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

module.exports = router;
