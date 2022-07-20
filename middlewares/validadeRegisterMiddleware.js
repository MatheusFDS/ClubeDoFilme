const path = require("path");
const { body } = require("express-validator");

const validacoes =  [
    body('nome').notEmpty().withMessage("Insira um Nome").isString(),
    body('email').notEmpty().withMessage("Insira um Email").isEmail(),
    body('senha1').notEmpty().withMessage('Insira uma senha'),
    body('senha2').notEmpty().withMessage('Repita a senha')
 
 ];

 module.exports = validacoes
 