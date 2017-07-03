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

/**
 * @swagger
 * /password/reset:
 *   post:
 *     tags:
 *       - Password
 *     summary: Reset user password
 *     description: Appends a password reset token to the user, to make possible to change the password. Of course this operation can be applied only on registered users. 
 *     parameters:
 *       - name: email
 *         in: body
 *         schema:
 *           type: string
 *           format: email
 *         required: true
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: string
 *         example:
 *           "Sent email"
 */
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

/**
 * @swagger
 * /password/set:
 *   post:
 *     tags:
 *       - Password
 *     description: Sets a new password for a certain user that already has a token to authorize the operation. Of course only registered users can do this, since they received to token by email.
 *     summary: Set user password
 *     parameters:
 *       - name: token
 *         in: body
 *         schema:
 *           allOf:
 *             - $ref: '#/definitions/Pwd_reset'
 *             - properties:
 *                 userUsername:
 *                   type: string
 *                   description: The username that needs to change the password
 *         description: The pwd_object containing the token previously requested.
 *         required: true
 *       - name: password
 *         schema:
 *           type: string
 *           format: password
 *         required: true
 *         in: body
 *     responses:
 *       200:
 *         description: Succesful operation
 */
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
