/**
  This files provides all the endpoints for the who we are pages
**/
var express = require('express');
var router = express.Router();

router.get('/who-we-are', function(req, res, next){
  res.render('who-we-are/who-we-are', { title: 'Who we are', user:req.user});
});

router.get('/who-we-are/statistics', function(req, res, next){
  res.render('who-we-are/statistics', {title: 'Statistics and Awards', user:req.user});
});

router.get('/who-we-are/gallery', function(req, res, next){
  res.render('blank', {title: 'Gallery', user:req.user});
});

module.exports = router;
