/**
 * Created by massimo on 29/06/17.
 */
/**

 **/
var debug = require('debug')('api');
var express = require('express');
var models = require('../models');

var router = express.Router();



router.post('/api/contact', function(req, res, next) {
    models.inquiries.create(
        {
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            mail: req.body.mail,
            target: req.body.target,
            obj: req.body.object,
            message: req.body.message
        }
    ).then(function () {
        return res.status(200).json({message: "Thank you!"});
    }).catch(function (err) {
        console.log(err.message);
        return res.status(400).json({ message: "error" });
    })
});

module.exports = router;
