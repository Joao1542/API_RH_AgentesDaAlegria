const express = require('express');
const router = express.Router();
const voluntarioController = require('../controllers/voluntario-controller');

// Listando ** todos ** os voluntários
router.get('/all', voluntarioController.listVoluntarios);

// Criando um novo voluntário
router.post('/new', voluntarioController.createVoluntario);

module.exports = router;