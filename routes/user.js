const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware');
const validacoes = require('../middlewares/validadeRegisterMiddleware');


const logDBMiddleware = require('../middlewares/logDB');
const loggedUserMiddleware = require('../middlewares/loggedUserMiddleware');
const notLoggedUserMiddleware = require('../middlewares/notLoggedUserMiddleware');



// Controllers
const userController = require('../controllers/userController');

// Visualiza formulário de cadastro
router.get('/register', loggedUserMiddleware, userController.register);

// Processa formulário de cadastro
router.post(
    '/register', 
    upload.single("avatar"),   logDBMiddleware, validacoes,
    userController.processRegister
);

// Visualiza formulário de login
router.get('/login', loggedUserMiddleware, userController.login);

// Processamento do formulário de login
router.post('/login', userController.loginProcess);

// Fazer logout
router.get('/logout', notLoggedUserMiddleware, userController.logout);

// Profile
router.get('/profile', notLoggedUserMiddleware, userController.profile);

module.exports = router;