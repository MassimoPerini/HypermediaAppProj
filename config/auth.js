// Passport middleware configuration
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sha1 = require('sha1');
var models = require('../models');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('local-login', new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    models.users.find({where:{'username': username}}).then(function(user){
    	if(!user){
    		return done(null, false);
    	}
    	if(user.password != sha1(password)){
    		return done(null,false);
    	}
    	return done(null, user);
    });
  });
}));

passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, username, password, done){
  return models.users.create({
    username: username,
    password: password,
      mail: req.body.mail,
    name: req.body.name,
    surname: req.body.surname,
      cf: req.body.cf
  }).then(function(user){
    done(null, user);
  }).catch(function(error){
    done(error);
  });
}));

module.exports = passport;
