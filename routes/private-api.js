/**
  This file provides all the endpoints for the authentication and private APIs
**/
var express = require('express');
var email = require('../config/mail.js');
var models = require('../models');
var debug = require('debug')('api');
var moment = require('moment');
var passport = require('../config/auth.js');

var router = express.Router();

// Set expiration time to 15 minutes
const PWD_RESET_EXPIRATION_TIME = 15 * 60;

router.post('/api/password/reset', function(req, res, next){
  models.users.findOne({
    where: {
      mail: req.body.email
    }
  }).then(function(user){
    return models.pwd_resets.create({
      token: '',
      userUsername: user.username
    });
  }).then(function(pwd_reset){
    var link = 'https://polimi-hyp-2017-team-10543744.herokuapp.com/password-reset?token=' + pwd_reset.token;
    var body = `
    <h1>CPM  clinic access control</h1>
    You have requested a password reset for this account.
    Click on the link below to reset the password
    <a href=` + link + '>' + link + '</a>';
    email.sendEmail(req.body.email, 'CPM password reset', body);
    res.send("Sent email");
  }).catch(function(error){
    debug(error);
    next(error);
  });
});

router.post('/api/password/set', function(req, res, next){
  models.pwd_resets.findOne({
    where: {
      token: req.body.token
    }
  }).then(function(pwd_reset){
    // Check if the reset token is valid ()
    var secondsFromNow = moment.duration(moment().diff(moment(pwd_reset.createdAt))).asSeconds();
    if (secondsFromNow > PWD_RESET_EXPIRATION_TIME) return Promise.reject(401);
    return models.users.update({
        password: req.body.password
      },{
        where: {
          username: pwd_reset.userUsername
        },
        individualHooks: true
      });
  }).then(function(user){
    res.send(user);
  }).catch(function(error){
    debug(error);
    next(error);
  });
});

module.exports = router;
