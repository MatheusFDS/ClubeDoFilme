const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const movieController = {
    movieList: async(req, res) => {
        // let filmes = await db.Filme.findAll();
        // console.log(filmes);
        // res.send(filmes);

        // let categorias = await db.Categoria.findAll();
        // console.log(categorias);
        // res.send(categorias);

        // let filmes = await db.Filme.findAll({
        //     include: {
        //         model: db.Categoria,
        //         as: 'categorias',
        //         required: true
        //     }
        // });
        // console.log(filmes);
        // res.send(filmes);

        let filmesAnimacao = await db.Filme.findAll({                
            
            include: {
                model: db.Categoria,
                as: 'categorias',
                required: true,
                where: {
                    nome_categoria: {[Op.like]: 'Animação'},                    
                }
            },                                                   
        });

        let filmesDramaTotal = await db.Filme.findAll({                            
            include: {
                model: db.Categoria,
                as: 'categorias',
                required: true,
                where: {                    
                     nome_categoria: {[Op.like]: 'Drama'},
                }
            },                                                   
        });

        
        let filmesDrama = filmesDramaTotal.filter(filmeDrama => {
            
            //verifica se o filme de drama já foi apresentado como animação.
            let resultado = filmesAnimacao.find(filmeAnimacao => {
                if(filmeAnimacao.id_filme === filmeDrama.id_filme){
                    return filmeAnimacao;
                }
            })
                        
            
            if(resultado === undefined){
                console.log(filmeDrama.titulo);
                return filmeDrama;
            } else {
                console.log(resultado.titulo);
            }

        });
        // res.send(filmesDrama);

        // const {filmes} = filmesAnimacao;
        // console.log(filmes);
        // res.send(filmes);
        // res.send(filmesAnimacao);
        // res.send(filmesDrama);
        
        // console.log(filmesAnimacao);
        
        // console.log('aqui')
        // console.log(x);

        res.render('movieList', {filmesAnimacao, filmesDrama});
    },
    movieDetail: (req, res) => {
        return res.render('movieDetail');
    },    
};

module.exports = movieController;