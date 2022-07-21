const User = require('../models/User')

const userLoggedMiddleware = function(req, res, next){
    res.locals.isLogged = false;

    if(req.cookies.username){
        req.session.userLogged = User.findByField('username', req.cookies.username)
    } 

    if (req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    }

    next();

    
}

module.exports = userLoggedMiddleware;