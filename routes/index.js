var express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const homepageIndex = require("../controllers/homepageIndex");
const login = require("../controllers/login");




/* GET home page. */
router.get("/", homepageIndex.homepageIndex);
router.get("/entrar", login.entrar);
router.get("/cadastro", login.cadastro);

module.exports = router;
