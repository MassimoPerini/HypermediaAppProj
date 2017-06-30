/**
  Index.js file loads all the files containing
  express routers inside the routes directory
  and uses them in the main application.
**/

var express = require('express');
var router = express.Router();

var path = require("path");
var fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'CPM clinic', user:req.user });
});

fs.readdirSync(__dirname)
.filter(function(file) {
  return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(file) {
  var subrouter = require(path.join(__dirname, file));
  router.use(subrouter);
});

router.get('/me', function(req, res, next){
  res.send(req.user);
});

module.exports = router;
