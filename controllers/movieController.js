const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const movieController = {
    movieList: async(req, res) => {      
        
        let filmesLancamentoOuOscar = await db.Filme.findAll({                
            
            include: {
                model: db.Categoria,
                as: 'categorias',
                required: true,
                where: {
                    [Op.or]: [
                        {nome_categoria: {[Op.like]: 'Lançamento'}},
                        {nome_categoria: {[Op.like]: 'Oscar'}},
                    ]                    
                }
            },                                                   
        });        

        // res.send(filmesLancamentoOuOscar);

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
                // console.log(filmeDrama.titulo);
                return filmeDrama;
            } /*else {
                console.log(resultado.titulo);
            }*/

        });        

        res.render('movieList', {filmesLancamentoOuOscar, filmesAnimacao, filmesDrama});
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

        //captura as categorias do filme selecionado:
        let filmeCategorias = [];
        filme.categorias.forEach(categoria => {
            filmeCategorias.push(categoria.id_categoria);
        })
        
        // Recomendação de filmes é baseado na categoria do filme que foi selecionado.
        let filmesRecomendados = await db.Filme.findAll({              
            include: {
                model: db.Categoria,
                as: 'categorias',
                required: true,
                where: {
                    id_categoria: {[Op.in]: filmeCategorias},
                }
            },
            where : {
                id_filme: {[Op.ne] : id}
            }                                                
        });        

        res.render('movieDetail', {filme, filmesRecomendados});
    },    
};

module.exports = movieController;