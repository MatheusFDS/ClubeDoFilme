
const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function verificaAssinaturaMiddleware(req, res, next) {
    console.log('\nINICIO VER SESSION', req.session)    

    let assinaturaAtiva = req.session.assinatura;
    // se false ou undefined, então consulta na base (false: pode ter acabado de assinar, undefined: ainda não foi checado).
    if(assinaturaAtiva !== true){
        let dtAtual = new Date();
        try{
            assinaturaAtiva = await db.Pedido.findAll({
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
    };
    
    // se undefined, é pq não encontrou resultados no BD
    if(assinaturaAtiva === undefined) {
        req.session.assinatura = false;
        return res.redirect('/user/checkout');        
    } 
    else{ // altera pra true, para evitar que se pesquise novamente nesta mesma session
        req.session.assinatura = true;           
    }
    //Se chegar a esse ponto, middleware permite seguir em frente, para o próximo parâmetro da rota.
    next();
}

module.exports = verificaAssinaturaMiddleware