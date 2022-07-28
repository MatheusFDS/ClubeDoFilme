const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const checkoutController = {
    checkout: async(req, res) => {

        let produtos;
        try {
            produtos = await db.Produto.findAll();
        }
        catch(error) {
            console.log("----- erro ao recuperar as opções de assinaturas") // atribuir página de erro
        }

        console.log(produtos)        ;
        res.render('checkout', {produtos});
    },
    processCheckout: async(req, res) => {
        console.log(req.body)
        console.log(req.session);

        let dataAtual = new Date()
        let dataFinal = new Date;
        dataFinal.setMonth(dataAtual.getMonth()+12)

        //Obs: tentei converter para horário local, mas não deu certo. Talvez seja melhor usar a biblioteca moment.
        // console.log('--------------\n\n\n', dataAtual.toLocaleDateString(), dataFinal.toLocaleDateString());
        // var time = new Date('2014-03-14T23:54:00');
        // var outraData = new Date();
        // outraData.setHours(time.getHours() + 2);

        orderToCreate = {
            // id_pedido: ''.
            valor_pago: parseFloat(req.body.input_total.replace('R$', '')),
            dt_inic_assinatura: dataAtual,
            dt_fim_assinatura: dataFinal,
            id_matricula: req.session.userLogged.id_matricula,
            id_produto: parseInt(req.body.input_id)
        };
        console.log(orderToCreate);
        
        try{
            await db.Pedido.create({...orderToCreate})
            res.render('checkout_confirmation');
        }
        catch(error){
            console.log('------- imprime erro: ', error);
        }

    }
}

module.exports = checkoutController;