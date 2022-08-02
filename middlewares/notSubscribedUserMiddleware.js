function notSubscribedUserMiddleware(req, res, next) {
    if(req.session.assinatura !== true) {
        return res.redirect('/user/checkout')
    }
    next()
}

module.exports = notSubscribedUserMiddleware