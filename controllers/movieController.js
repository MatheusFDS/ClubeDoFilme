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

        let listaFilmesUsuario;
        try{
            listaFilmesUsuario = await db.UsuarioFilmeLista.findOne({            
                where: {             
                    id_filme: id,
                    id_matricula: req.session.userLogged.id_matricula
                }
            })
        } catch(error){
            console.log('erro') ///renderizar ou redirecionar para página de erro
        };
        
        console.log(listaFilmesUsuario)

        let onList;
        if(listaFilmesUsuario == undefined){
            onList=0;
        } else {
            onList=1;
        }

        res.render('movieDetail', {filme, filmesRecomendados, onList});
    },    
    movieSearch: async (req, res) => {
        
        let {filmePesquisado} = req.query;

        let filmesEncontrados = await db.Filme.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${filmePesquisado}%`
                }
            }
        })
        
        let mensagemRetorno;
        if (filmesEncontrados.length === 0) {
            mensagemRetorno = "A busca por '"+filmePesquisado+"' não retornou nenhum resultado.";
            console.log(mensagemRetorno)
        }
        else if (filmesEncontrados.length === 1) {
            mensagemRetorno = "Sua busca por '"+filmePesquisado+"' retornou 1 resultado.";
            console.log(mensagemRetorno)
        }
        else  {
            mensagemRetorno = "Sua busca por '"+filmePesquisado+"' retornou "+filmesEncontrados.length+" resultados.";
            console.log(mensagemRetorno)
        }

        // res.send(filmesEncontrados);

        res.render('movieSearch', {filmePesquisado, filmesEncontrados, mensagemRetorno})
    },
    addAssistirMaisTardeApi: async(req, res) => {
        console.log("PASSOU NA 'API'")
        console.log(req.body)

        dataToInsertList = {
            id_matricula: req.session.userLogged.id_matricula,
            id_filme: req.body.id_filme
        }
        console.log(dataToInsertList);
        
        await db.UsuarioFilmeLista.create(dataToInsertList)

        return res.json('deu certo');
    }
};

module.exports = movieController;