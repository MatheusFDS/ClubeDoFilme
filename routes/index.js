const express = require('express');
const router = express.Router();

// Controllers
const indexController = require('../controllers/indexController');

// Homepage
router.get('/', indexController.viewHomepage);

module.exports = router;