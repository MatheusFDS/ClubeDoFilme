const express = require('express');
const { cadastro } = require('../controllers/login');
const router = express.Router();
const homeInterna =require("../controllers/homeInterna");
const usuario = require("../controllers/usuario");

/* GET users listing. */
router.get('/', function(req, res, next) {
res.send('respond with a resource');});

//paginas ja logado
router.get("/homeinterna", homeInterna.homeInterna);
router.get("/usuario", usuario.usuario);

module.exports = router;
