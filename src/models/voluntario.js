const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  cpf: {
    type: String,
    unique: true,
    required: true,
  },
  rg: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  birthday: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  motivation: {
    type: String,
    required: true,
  },
  availability: {
    type: [String],
    enum: [
      "seg-manha",
      "seg-tarde",
      "ter-manha",
      "ter-tarde",
      "qua-manha",
      "qua-tarde",
      "qui-manha",
      "qui-tarde",
      "sex-manha",
      "sex-tarde",
      "sab-manha",
      "sab-tarde",
      "dom-manha",
      "dom-tarde",
    ],
    required: true,
  },
  affinityActivity: {
    type: [String],
    required: true,
  },
  imgUrl: {
    type: String,
    required: false,
  },
  lastPresence: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Voluntarios', schema);
