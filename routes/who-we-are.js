var express = require('express');
var router = express.Router();

router.get('/who-we-are', function(req, res, next){
  res.render('who-we-are/who-we-are', { title: 'Who we are'});
});

router.get('/who-we-are/statistics', function(req, res, next){
  res.render('who-we-are/statistics');
});

module.exports = router;
