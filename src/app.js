const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser')

// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
  //Deprecated warning is fixed by adding this follow line: 
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose default connection is open');
});

db.on('error', err => {
  console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
  db.close(() => {
      console.log(
        'Mongoose default connection is disconnected due to application termination'
      );
      process.exit(0);
  });
});

// App
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);
const voluntarioRoutes = require('./routes/voluntario-routes');
app.use('/voluntarios', voluntarioRoutes);

module.exports = app;
