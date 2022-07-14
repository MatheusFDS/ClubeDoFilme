const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/userController');

// Visualiza formulário de cadastro
router.get('/register', userController.register);

// Processa formulário de cadastro
router.post('/register', userController.processRegister);

// Visualiza formulário de login
router.get('/login', userController.login);

// Processamento do formulário de login
router.post('/login', userController.loginProcess);

module.exports = router;