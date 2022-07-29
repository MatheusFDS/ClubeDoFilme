const express = require('express');
const router = express.Router();
const notLoggedUserMiddleware = require('../middlewares/notLoggedUserMiddleware');

// Controllers
const movieController = require('../controllers/movieController');

// Catálogo de filmes
router.get('/', notLoggedUserMiddleware, movieController.movieList);

// Detalhes do filme
router.get('/detail/:id', notLoggedUserMiddleware, movieController.movieDetail);
// router.get('/detail', notLoggedUserMiddleware, movieController.movieDetail);

router.get('/search', notLoggedUserMiddleware, movieController.movieSearch);

router.post('/addAssistirMaisTardeApi', movieController.addAssistirMaisTardeApi);

module.exports = router;