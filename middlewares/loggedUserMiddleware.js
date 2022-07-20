function loggedUserMiddleware(req, res, next) {
    if(req.session.userLogged) {
        return res.redirect('/movie')
    }
    next()
}

module.exports = loggedUserMiddleware