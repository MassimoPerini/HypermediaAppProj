/**
  This file provides all the endpoints for the private portal
**/
var express = require('express');
var models = require('../models');
var router = express.Router();

var passport = require('../config/auth.js');

router.get('/login', function(req, res, next){
  res.render('private-area/login', { title: 'Login'});
});

router.post('/login',
  passport.authenticate('local-login', {
    successRedirect: '/private',
    failureRedirect: '/login?error=true'
  })
);

router.post('/signup',
    passport.authenticate('local-signup', {
    successRedirect: '/private',
    failureRedirect: '/login?error=true',
    failureFlash : true
}));

router.get('/logout', function(req,res,next){
  req.logout();
  res.clearCookie('connect.sid');
  req.session.destroy( function(){
    res.redirect('/');
  });
});

router.get('/private', function(req, res, next){
    if (!req.user){
        res.redirect('/login');
    }else {
        res.render('private-area/private-home', {title: 'Private area', user: req.user});
    }
});

router.get('/reservation', function(req, res, next){
    if (!req.user){
        res.redirect('/login');
    }else {
        models.services.findAll({})
        .then(function(services){
            res.render('private-area/booking', { title: 'Booking', services: services, user:req.user});
        });
    }
});

router.get('/password-reset', function(req, res, next){
  res.render('private-area/reset', {title: 'Password reset', user:req.user, token: req.query.token});
});

module.exports = router;
