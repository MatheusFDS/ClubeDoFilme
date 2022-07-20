const express = require('express');
const router = express.Router();
const loggedUserMiddleware = require('../middlewares/loggedUserMiddleware');
// Controllers
const indexController = require('../controllers/indexController');

// Homepage
router.get('/', loggedUserMiddleware, indexController.viewHomepage);

module.exports = router;