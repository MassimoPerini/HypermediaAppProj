var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'CPM clinic' });
});

router.get('/who-we-are', function(req, res, next){
  res.render('who-we-are/who-we-are', { title: 'Who we are' });
});

router.get('/who-we-are/statistics', function(req, res, next){
  res.render('who-we-are/statistics', { title: 'Statistics' });
});

router.get('/locations', function(req, res, next){
    res.render('locations', { title: 'Locations' });
});

router.get('/doctors', function(req, res, next){
    res.render('doctors', { title: 'Doctors' });
});

module.exports = router;
