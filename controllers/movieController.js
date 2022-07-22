const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const movieController = {
    movieList: async(req, res) => {        

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
            });                        
            
            if(resultado === undefined){
                console.log(filmeDrama.titulo);
                return filmeDrama;
            } else {
                console.log(resultado.titulo);
            }

        });        

        res.render('movieList', {filmesAnimacao, filmesDrama});
    },
    movieDetail: async (req, res) => {
        const {id} = req.params;        

        // let filme = await db.Filme.findByPk(id);
        let filme = await db.Filme.findOne({                            
            include: {
                model: db.Categoria,
                as: 'categorias',
                required: true,                
            },
            where: {             
                id_filme: id,
            }
        });

        /* Aloca informações de categorias em uma única string, no formato: "categoria A, categoria B"*/
        // let filmeCategorias = [];
        // filme.categorias.forEach(categoria => {
        //     filmeCategorias.push(categoria.nome_categoria);
        // })
        // filmeCategorias = filmeCategorias.join(', ');
        // console.log(filmeCategorias);
        
        res.render('movieDetail', {filme});
    },    
};

module.exports = movieController;