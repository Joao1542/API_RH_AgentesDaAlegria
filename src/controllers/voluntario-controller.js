const mongoose = require('mongoose');
const Voluntarios = require('../models/voluntario')

// GET
exports.listVoluntarios = async (req, res) => {
  try {
    const data = await Voluntarios.find({});
    res.status(200).send(data);
  } 
  catch (err) {
    res.status(500).send({message: 'Falha ao carregar os voluntários.'});
  }
};

// POST 
exports.createVoluntario = async (req, res) => {
  console.log(req.body)
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

    res.status(201).send({
      message: 'Voluntário(a) cadastrado(a) com sucesso!'
    });
  } 
  catch (err) {
    res.status(500).send({
      message: `Falha ao cadastrar o voluntário(a). ${err}` 
    });
  }
};