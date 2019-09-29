const express = require('express');
const router = express.Router();
const atividadeController = require('../controllers/atividade-controller');

// Listando ** todos ** os voluntários
router.get('/', atividadeController.listAcoes);

// Criando um novo voluntário
router.post('/new', atividadeController.createAcao);

module.exports = router;