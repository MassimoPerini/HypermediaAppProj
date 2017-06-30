/**
 * Created by massimo on 30/06/17.
 */
passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        findOrCreateUser = function(){
            User.findOne({'username':username},function(err, user) {
                if (err){
                    console.log('Error in Signup: ' + err);
                    return done(err);
                }
                if (user) {
                    console.log('User already exists');
                    return done(null, false,
                        req.flash('message','User Already Exists'));
                } else {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.firstName = req.body.firstName;
                    newUser.lastName = req.body.lastName;

                    // save the user
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };
        process.nextTick(findOrCreateUser);
    });
);
