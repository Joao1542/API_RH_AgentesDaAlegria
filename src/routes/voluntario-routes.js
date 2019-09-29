const express = require('express');
const router = express.Router();
const voluntarioController = require('../controllers/voluntario-controller');

// Listando ** todos ** os voluntários
router.get('/', voluntarioController.listVoluntarios);

// Criando um novo voluntário
router.post('/new', voluntarioController.createVoluntario);

// Atualizando um voluntário
router.put('/editar/:id', voluntarioController.updateVoluntario);

// Removendo um voluntário
router.delete('/delete/:id', voluntarioController.deleteVoluntario);

module.exports = router;