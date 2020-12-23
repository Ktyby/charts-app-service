const User = require('../models/users');
const bCrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
	passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  (req, username, password, done) => { 
    User.findOne({ 'username' :  username }, 
    (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log('User Not Found with username ' + username);
        return done(null, false, req.flash('message', 'User Not found.'));                 
      }

      if (!isValidPassword(user, password)) {
        console.log('Invalid Password');
        return done(null, false, req.flash('message', 'Invalid Password'));
      }

      return done(null, user);
    }
  );
}));

  const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
  }   
}