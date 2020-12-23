const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const routes = require('./routes/index');
const { APP_PORT } = require('./config');

const app = express();

app.use(cors({ preflightContinue: true, optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
  secret: "top_secret",
  resave: true,
  saveUninitialized: true
}));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const flash = require('connect-flash');
app.use(flash());

const initPassport = require('./passport/init');
initPassport(passport);

app.use(routes);

mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) return console.log(err);

    app.listen(APP_PORT, () => {
      console.info(`App listening on port ${APP_PORT}!`);
    });
});

module.exports = app;