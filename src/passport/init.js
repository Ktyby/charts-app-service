const login = require('./login');
const signup = require('./signup');
const User = require('../models/users');

module.exports = (passport) => {
	// Passport должен иметь возможность сериализовать и десериализовать пользователей для поддержки постоянных сеансов входа в систему
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  // Настройка паспортных стратегий для входа в систему и регистрации/регистрации
  login(passport);
  signup(passport);
}