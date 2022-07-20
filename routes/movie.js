const express = require('express');
const router = express.Router();
const notLoggedUserMiddleware = require('../middlewares/notLoggedUserMiddleware');

// Controllers
const movieController = require('../controllers/movieController');

// Catálogo de filmes
router.get('/', notLoggedUserMiddleware, movieController.movieList);

// Detalhe do filme
router.get('/detail/', notLoggedUserMiddleware, movieController.movieDetail);

module.exports = router;