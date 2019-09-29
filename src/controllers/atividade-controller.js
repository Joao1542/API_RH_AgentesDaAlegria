const mongoose = require('mongoose');
const Atividades = require('../models/atividade');
const unknownError = 'Erro desconhecido';
// GET
exports.listAcoes = async (req, res) => {
  try {
    const dados = await Atividades.find({}, '-__v');
    res.status(200).send(dados);
  } 
  catch (err) {
    res.status(500).send({message: 'Falha ao carregar as ações.'});
  }
};

// POST 
exports.createAcao = async (req, res) => {
  try {
    const atividade = new Atividades({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      place: req.body.place,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });
    await atividade.save();

    res.status(201).json({
      success: true,
      message: 'Ação cadastrada com sucesso!'
    });
  } 
  catch (err) {
    if (err) {
      return res.status((err.errors) ? 422 : 400).json({
        success: false,
        message: 'Falha ao cadastrar a ação.',
        errors: (err.errors) ? Object.entries(err.errors).map(e => {
          return (e[1] && e[1].message) ? e[1].message : unknownError
        }) : unknownError
      });
    }
  }
};