const mongoose = require('mongoose');
const Voluntarios = require('../models/voluntario');
const unknownError = 'Erro desconhecido';

// GET
exports.listVoluntarios = async (req, res) => {
  try {
    const dados = await Voluntarios.find({}, '-__v');
    res.status(200).send(dados);
  } 
  catch (err) {
    res.status(500).send({message: 'Falha ao carregar os voluntários.'});
  }
};

// POST 
exports.createVoluntario = async (req, res) => {
  try {
    const voluntario = new Voluntarios({
      cpf: req.body.cpf,
      rg: req.body.rg,
      name: req.body.name,
      birthday: req.body.birthday,
      phone: req.body.phone,
      email: req.body.email,
      neighborhood: req.body.neighborhood,
      profession: req.body.profession,
      motivation: req.body.motivation,
      availability: req.body.availability,
      affinityActivity: req.body.affinityActivity,
      imgUrl: req.body.imgUrl,
      lastPresence: req.body.lastPresence,
    });
    await voluntario.save();

    res.status(201).json({
      success: true,
      message: 'Voluntário(a) cadastrado(a) com sucesso!'
    });
  } 
  catch (err) {
    if (err) {
      return res.status((err.errors) ? 422 : 400).json({
        success: false,
        message: 'Falha ao cadastrar o voluntário(a).',
        errors: (err.errors) ? Object.entries(err.errors).map(e => {
          return (e[1] && e[1].message) ? e[1].message : unknownError
        }) : unknownError
      });
    }
  }
};

//PUT
exports.updateVoluntario = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Voluntarios.findByIdAndUpdate(id, {
      $set: data
    });
    res.status(200).json({
      success: true,
      message: 'Voluntário(a) atualizado com sucesso!'
    });
  }
  catch(err) {
    res.status(500).json({
      success: false,
      message: 'Algo de errado aconteceu ao tentar atualizar o voluntário(a).'
    });
  }
};

// DELETE
exports.deleteVoluntario = async (req, res) => {
  try {
    const id = req.params.id;
    await Voluntarios.findOneAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'Voluntário(a) removido com sucesso!'
    });
  }
  catch(err) {
    res.status(500).json({
      success: false,
      message: 'Algo de errado aconteceu ao tentar remover o voluntário(a).'
    });
  }
};