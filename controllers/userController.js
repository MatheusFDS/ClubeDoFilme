const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');

const User = require('../models/User');

const userController = {
   
    register: (req, res) =>{
        return  res.render('userRegisterForm');
    },
    processRegister: (req,res) => {
        const errors = validationResult(req);
   
        if (!errors.isEmpty())  {
            return res.render("erroCadastro", { errors: errors.mapped()});
        }
        if  (!req.file)  {

            return res.render("erroCadastro" , { errors: errors.mapped()});
          
        }
    let userExists = User.findUserbyField('email', req.body.email);

    if(userExists) {
        return res.render('erroCadastro', {
            errors: {
                email: {
                    msg: 'Este email ja esta registrado, clicar em recuperar senha'
                }
    },
    
    oldData: req.body
    });
}

let s1 = req.body.senha1;
let senha = req.body.senha2;

if(s1 != senha) {
    return res.render('erroCadastro', {
        errors: {
            senha: {
                msg: 'Coloque duas senhas iguais'
            }
},
oldData: req.body
});
}

        let userToCreate = {
        ...req.body,
        senha1: bcrypt.hashSync(req.body.senha1, 10), 
        senha2: bcrypt.hashSync(req.body.senha2, 10),
        avatar: req.file.filename
        }

    
        let userCreated = User.create(userToCreate);

       return  res.redirect('/user/login');
    
    },

    login: (req, res) => {
        return  res.render('userLoginForm');
    },

    loginProcess: (req, res) => {
    
     let userToLogin = User.findUserbyField('email', req.body.email);
      if(userToLogin){
       let isPasswordVerified = bcrypt.compareSync(req.body.senha1, userToLogin.senha1)

       if(isPasswordVerified){
        delete userToLogin.senha1
        delete userToLogin.senha2
        req.session.userLogged = userToLogin
     
        if(req.body.remember_user) {
            res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60)* 30})
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


      }

      return res.render('userLoginForm', {
        errors: {
            email: {
             msg: 'Este usuario nao existe, por favor cadastre-se'
            }
        }
       })
    },  

    profile: (req, res) => {
        return  res.render('userProfile', {
            userLogged: req.session.userLogged
        });
    },

    logout: (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy();
        return  res.redirect('/');
    }
  
}

module.exports = userController;