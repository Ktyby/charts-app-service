const LocalStrategy   = require('passport-local').Strategy;
const User = require('../models/users');
const bCrypt = require('bcrypt-nodejs');

module.exports = (passport) => {
	passport.use('signup', new LocalStrategy({ passReqToCallback : true },
    (req, username, password, done) => {
      const findOrCreateUser = () => {
        User.findOne({ 'username' :  username }, (err, user) => {
          if (err) {
            console.log('Error in SignUp: '+err);

            return done(err);
          }
          
          if (user) {
            console.log('User already exists with username: '+username);

            return done(null, false, req.flash('message','User Already Exists'));
          } else {
            const newUser = new User();

            newUser.username = username;
            newUser.password = createHash(password);

            newUser.save((err) => {
              if (err) {
                console.log('Error in Saving user: '+err);  
                throw err;  
              }   

              console.log('User Registration succesful');    
              return done(null, newUser);
            });
          }           
        });
      };

      findOrCreateUser();
    })
  );

  const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }   
}