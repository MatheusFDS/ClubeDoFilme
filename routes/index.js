var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
var ContatoController = require("../controllers/ContatoController")
var entrar = require("../controllers/login/entrar")
var cadastro = require("../controllers/login/cadastro")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/contato", ContatoController.index);
router.get("/entrar", entrar.index);
router.get("/cadastro", cadastro.index);

module.exports = router;
