function subscribedUserMiddleware(req, res, next) {
    if(req.session.assinatura === true) {
        return res.redirect('/movie')
    }
    next()
}

module.exports = subscribedUserMiddleware