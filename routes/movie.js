const express = require('express');
const router = express.Router();
const notLoggedUserMiddleware = require('../middlewares/notLoggedUserMiddleware');
const notSubscribedUserMiddleware = require('../middlewares/notSubscribedUserMiddleware');

// Controllers
const movieController = require('../controllers/movieController');

// Catálogo de filmes
router.get('/', notLoggedUserMiddleware, notSubscribedUserMiddleware, movieController.movieList);

// Detalhes do filme
router.get('/detail/:id', notLoggedUserMiddleware, notSubscribedUserMiddleware, movieController.movieDetail);
// router.get('/detail', notLoggedUserMiddleware, movieController.movieDetail);

router.get('/search', notLoggedUserMiddleware, notSubscribedUserMiddleware, movieController.movieSearch);

router.post('/addAssistirMaisTardeApi', movieController.addAssistirMaisTardeApi);

module.exports = router;