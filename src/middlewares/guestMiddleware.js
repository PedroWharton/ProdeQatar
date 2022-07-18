const guestMiddleware = function(req, res, next){
    if(req.session.userLogged){
        return res.redirect('/user/detail')
    }
    next();
}

module.exports = guestMiddleware;