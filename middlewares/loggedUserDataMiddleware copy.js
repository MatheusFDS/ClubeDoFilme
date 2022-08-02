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

   next()
}

module.exports = loggedUserDataMiddleware