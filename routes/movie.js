const express = require('express');
const router = express.Router();

// Controllers
const movieController = require('../controllers/movieController');

// Catálogo de filmes
router.get('/', movieController.movieList);

// Detalhe do filme
router.get('/detail', movieController.movieDetail);

module.exports = router;