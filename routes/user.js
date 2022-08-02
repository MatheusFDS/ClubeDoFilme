const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware');
const validacoes = require('../middlewares/validadeRegisterMiddleware');


const logDBMiddleware = require('../middlewares/logDB');
const loggedUserMiddleware = require('../middlewares/loggedUserMiddleware');
const notLoggedUserMiddleware = require('../middlewares/notLoggedUserMiddleware');

const subscribedUserMiddleware = require('../middlewares/subscribedUserMiddleware');


// Controllers
const userController = require('../controllers/userController');
const checkoutController = require('../controllers/checkoutController');

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

router.get('/checkout', notLoggedUserMiddleware, subscribedUserMiddleware, checkoutController.checkout);

router.post('/checkout', notLoggedUserMiddleware, checkoutController.processCheckout);

router.put('/profile/update', notLoggedUserMiddleware, upload.single("avatar"), userController.processUploadAvatar);

router.delete('/profile/delete', notLoggedUserMiddleware, userController.destroy);

module.exports = router;