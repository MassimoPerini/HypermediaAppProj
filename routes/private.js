/**
  This file provides all the endpoints for the private portal
**/
var express = require('express');
var models = require('../models');
var router = express.Router();

var passport = require('../config/auth.js');

router.get('/login', function(req, res, next){
    res.render('private-area/login', { title: 'Login'});
  res.send("errore login");
});

//app.use(function({})     passo username   req.user

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/private',
    failureRedirect: '/login?error=true'
  })
);

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
    }
    else {
        res.render('private-area/private-home', {title: 'Private area', user: req.user});
    }
});

module.exports = router;
