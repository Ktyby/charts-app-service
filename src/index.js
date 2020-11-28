const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const mongoose = require("mongoose");
const { APP_PORT } = require('./config');

const app = express();

app.use(cors({
  preflightContinue: true,
  optionsSuccessStatus: 200,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
    if(err) return console.log(err);
    app.listen(APP_PORT, () => {
      console.info(`App listening on port ${APP_PORT}!`);
    });
});

module.exports = app;