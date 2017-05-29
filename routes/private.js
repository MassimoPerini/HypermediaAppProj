var express = require('express');
var models = require('../models');

var router = express.Router();

var passport = require('../config/auth.js');

router.get('/login', function(req, res, next){
  res.send("errore login");
});

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
  res.send("Hello again!" + req.user);
})

module.exports = router;
