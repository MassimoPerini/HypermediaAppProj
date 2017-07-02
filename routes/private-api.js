
var debug = require('debug')('content');
var express = require('express');
var models = require('../models');

var router = express.Router();

router.get('/service/:id/location', function(req, res, next){
    models.locations.findAll({
        include:[{
            model: models.services,
            where: {id: req.params.id},
            attributes: []
        }]
    }).then(function(locations){
        res.send({
            data: locations
        })
    }).catch(function(error){
        debug(error);
        next(error);
    })
});


router.get('/api/reservation', function(req, res, next){
    models.bookings.create(
        {
            username: req.user.username,
            day: req.body.date,
            time_slot: req.body.hour,
            service: req.body.service,
            location: req.body.location,
        }
    ).then(function () {
        return res.status(200).json({message: "Thank you!"});
    }).catch(function (err) {
        console.log(err.message);
        return res.status(400).json({ message: "error" });
    })
});


module.exports = router;
