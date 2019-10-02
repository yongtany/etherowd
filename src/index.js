const express = require('express');
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Routes
app.use('/users', require('routes/users.routes'));

// Server start
app.listen(process.env.PORT || 5000, err => {
  if(err) {
    throw err;
  } else {
    console.log(`
        --------------------------------
        Server runnging on port: ${process.env.PORT || 5000}
        --------------------------------
        `);
  }
});
