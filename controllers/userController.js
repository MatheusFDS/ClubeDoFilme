const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');

const User = require('../models/User');
const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const userController = {

    register: (req, res) => {
        return res.render('userRegisterForm');
    },
    processRegister: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("erroCadastro", { errors: errors.mapped() });
        }
        if (!req.file) {

            return res.render("erroCadastro", { errors: errors.mapped() });

        }

        // let userExists = User.findUserbyField('email', req.body.email);
        let userExists;
        try {
            userExists = await db.Usuario.findOne({
                where: {
                    email: {
                        [Op.like]: `%${req.body.email}%`
                    }
                }
            })
        } catch (error) {
            console.log('erro ao pesquisar se email já existe'); //redirecionar para página de erro.
        };


        if (userExists) {
            return res.render('erroCadastro', {
                errors: {
                    email: {
                        msg: 'Este email ja esta registrado, clique em recuperar senha'
                    }
                },

                oldData: req.body
            });
        }

        let s1 = req.body.senha1;
        let senha = req.body.senha2;

        if (s1 != senha) {
            return res.render('erroCadastro', {
                errors: {
                    senha: {
                        msg: 'Coloque duas senhas iguais'
                    }
                },
                oldData: req.body
            });
        };
        
        let userToCreate = {
            // id_matricula: DEFAULT,
            nome_completo: req.body.nome,
            email: req.body.email,
            data_cadastro: new Date(),
            senha: bcrypt.hashSync(req.body.senha1, 10),
            avatar: req.file.filename
        }
        console.log('--- processRegister ', userToCreate); //retirar

        try {
            await db.Usuario.create({
                ...userToCreate
            })
        } catch (error) {
            console.log('--- erro ao tentar salvar as informações na base de dados') //ajustar mensagem de erro
        };

        return res.redirect('/user/login');

    },

    login: (req, res) => {
        return res.render('userLoginForm');
    },

    loginProcess: async(req, res) => {

        let userToLogin;
        try {
            userToLogin = await db.Usuario.findOne({
                where: {
                    email: {
                        [Op.like]: `%${req.body.email}%`
                    }
                }
            })
        } catch (error) {       
            console.log('erro ao recuperar o e-mail na base de dados'); //redirecionar para página de erro.
        };

        
        // let userToLogin = User.findUserbyField('email', req.body.email);        
        if (userToLogin) {
            let isPasswordVerified = bcrypt.compareSync(req.body.senha1, userToLogin.senha)

            if (isPasswordVerified) {
                delete userToLogin.senha1
                delete userToLogin.senha2
                req.session.userLogged = userToLogin

                if (req.body.remember_user) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 30 })                    
                }
                return res.redirect('/movie')
            }


            return res.render('userLoginForm', {
                errors: {
                    senha1: {
                        msg: 'Senha incorreta'
                    }
                }
            })

        } else {       

            return res.render('userLoginForm', {
                errors: {
                    email: {
                        msg: 'Este usuario nao existe, por favor cadastre-se'
                    }
                }
            })
        }
    },

    profile: (req, res) => {
        return res.render('userProfile', {
            userLogged: req.session.userLogged
        });
    },

    logout: (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy();
        return res.redirect('/');
    }

}

module.exports = userController;
