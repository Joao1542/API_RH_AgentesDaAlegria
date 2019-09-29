const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const activitySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nome da ação não informado'],
  },
  description: {
    type: String,
    required: [true, 'Descrição da ação não informada'],
  },
  date: {
    type: String,
    validate: {
      validator: (date) => {
          return moment(date, "DD-MM-YYYY", true).isValid()
      }, 
      message: 'Data de realização inválida'
    },
    required: [true, 'Data de realização não informada'],
  },
  place: {
    type: String,
    required: [true, 'Local não informado'],
  },
  startTime: {
    type: String,
    required: [true, 'Horário de início não informado'],
  },
  endTime: {
    type: String,
    required: [true, 'Horário de término não informado'],
  },
})

module.exports = mongoose.model('Atividade', activitySchema);