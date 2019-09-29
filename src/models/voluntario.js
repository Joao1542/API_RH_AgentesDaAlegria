const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const voluntarySchema = new Schema({
  cpf: {
    type: String,
    required: [true, 'CPF não informado'],
  },
  rg: {
    type: String,
    required: [true, 'Rg não informado'],
  },
  name: {
    type: String,
    required: [true, 'Nome não informado'],
    trim: true,
  },
  birthday: {
    type: String,
    required: [true, 'Data de nascimento não infomarda'],
    validate: {
      validator: (birthday) => {
          return moment(birthday, "DD-MM-YYYY", true).isValid()
      }, 
      message: 'Data de nascimento inválida'
    }
  },
  phone: {
    type: String,
    required: [true, 'Telefone não informado'],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Email não informado'],
    validate: {
      validator: (email) => {
          return isEmail(email)
      },
      message: 'Email inválido'
    }
  },
  neighborhood: {
    type: String,
    required: [true, 'Bairro não informado'],
  },
  profession: {
    type: String,
    required: [true, 'Profissão não informada'],
  },
  motivation: {
    type: String,
    required: [true, 'Motivação não informada'],
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
    required: [true, 'Disponibilidade não informada'],
  },
  affinityActivity: {
    type: [String],
    required: [true, 'Afinidades por ativades não informadas'],
  },
  imgUrl: {
    type: String,
    required: false,
  },
  lastPresence: {
    type: String,
    required: [true, 'Última data de presença não informada'],
    default: 'Ainda não participou de nenhuma ação.',
  },
});

voluntarySchema.path('email').validate({
  isAsync: true,
  validator: async function(value, done) {
    if (!this.isNew) {
      return done(true);
    }
    try {
      const [volunteers] = await Promise.all([
        mongoose.model('Voluntarios').countDocuments({email: value})
      ]);
      done(volunteers === 0 || null);
    }
    catch(err) {
      done(err)
    }
  },
  message: 'Email já cadastrado'
});

voluntarySchema.path('cpf').validate({
  isAsync: true,
  validator: async function(value, done) {
    if (!this.isNew) {
      return done(true);
    }
    try {
      const [volunteers] = await Promise.all([
        mongoose.model('Voluntarios').countDocuments({cpf: value})
      ]);
      done(volunteers === 0 || null);
    }
    catch(err) {
      done(err)
    }
  },
  message: 'CPF já cadastrado'
});

voluntarySchema.path('rg').validate({
  isAsync: true,
  validator: async function(value, done) {
    if (!this.isNew) {
      return done(true);
    }
    try {
      const [volunteers] = await Promise.all([
        mongoose.model('Voluntarios').countDocuments({rg: value})
      ]);
      done(volunteers === 0 || null);
    }
    catch(err) {
      done(err)
    }
  },
  message: 'RG já cadastrado'
});


module.exports = mongoose.model('Voluntarios', voluntarySchema);
