const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser')

// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  //Deprecated warning is fixed by adding this follow line: 
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Conexão com o DB iniciada');
});
db.on('error', err => {
  console.log(`Algum erro aconteceu: \n${err}`);
});
db.on('disconnected', () => {
  console.log('Conexão com o DB encerrada');
});

// App
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Load routes
const voluntarioRoutes = require('./routes/voluntario-routes');
app.use('/voluntarios', voluntarioRoutes);

const acoesRoutes = require('./routes/atividade-routes');
app.use('/acoes', acoesRoutes);
module.exports = app;
