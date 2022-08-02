/*const User = require("../models/User");*/

const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function loggedUserDataMiddleware(req, res, next) {
   res.locals.isLogged = false;   

    let emailInCookie = req.cookies.userEmail;
    // let userFromCookie = User.findUserbyField('email',emailInCookie);

    if(emailInCookie != undefined){ 
        let userToSession = await db.Usuario.findOne({
        where: {
                email: {
                    [Op.like]: `%${emailInCookie}%`
                }
            }
        })
        delete userToSession.dataValues.senha;
        req.session.userLogged = userToSession.dataValues;
    }
    

    // if(userFromCookie) {
    //     req.session.userLogged = userFromCookie
    // }

   if (req.session.userLogged) {
        res.locals.isLogged = true;
   }

   //============== Verifica se possui assinatura ativa ============================
   let pesquisaAssinatura;   
    // se false ou undefined, então consulta na base (false: pode ter acabado de assinar, undefined: ainda não foi checado).
    // se já tiver passado por aqui uma vez e registrado na session que há assinatura, então não executa de novo.
    if(res.locals.isLogged && req.session.assinatura !== true){
        let dtAtual = new Date();
        try{
            pesquisaAssinatura = await db.Pedido.findAll({
                where: {
                    id_matricula: req.session.userLogged.id_matricula,
                    dt_inic_assinatura: {
                        [Op.lte]: `%${dtAtual}%`
                    },
                    dt_fim_assinatura: {
                        [Op.gte]: `%${dtAtual}%`
                    }
                    
                }
            })
        }
        catch(error){
            console.log(error) //substituir por uma página de erro.
        }

        console.log('\nASSINATURA ATIVA - pós consulta', pesquisaAssinatura);
        // se vazio, é pq não encontrou resultados no BD (não possui assinatura ativa.)
        if(pesquisaAssinatura.length === 0) {
            req.session.assinatura = false;
            // return res.redirect('/user/checkout');        
        } 
        else{ // altera pra true, para evitar que se pesquise novamente nesta mesma session
            req.session.assinatura = true;                       
        }

    };
    
    
    console.log('\n REQ SESSION', req.session);

   next()
}

module.exports = loggedUserDataMiddleware