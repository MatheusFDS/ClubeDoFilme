/*const User = require("../models/User");*/

const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function loggedUserDataMiddleware(req, res, next) {
   res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    // let userFromCookie = User.findUserbyField('email',emailInCookie);

    let userFromCookie        
    db.Usuario.findOne({
    where: {
            email: {
                [Op.like]: `%${emailInCookie}%`
            }
        }
    })
      .then(user => {
          userFromCookie = user
      })     
    
    

    if(userFromCookie) {
        req.session.userLogged = userFromCookie
    }

   if (req.session.userLogged) {
        res.locals.isLogged = true;
   }

   next()
}

module.exports = loggedUserDataMiddleware