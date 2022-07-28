const express = require('express');
const router = express.Router();
const loggedUserMiddleware = require('../middlewares/loggedUserMiddleware');
// Controllers
const indexController = require('../controllers/indexController');

// Homepage
router.get('/', loggedUserMiddleware, indexController.viewHomepage);

router.post('/teste', (req, res) => {
    console.log("index route", req.body);
});

module.exports = router;