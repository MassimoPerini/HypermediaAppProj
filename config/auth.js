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

passport.use(new LocalStrategy(function(username, password, done) {
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

module.exports = passport;
