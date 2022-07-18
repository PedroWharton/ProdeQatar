const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController ={
    profile: function(req, res){
        let userLogged = req.session.userLogged
        res.render('./user/profile', {user: userLogged, name: 'styles', title: 'Detalle'})
    },

    login: function(req, res){
        res.render('./user/login', {name: 'styles', title: 'Login'});
    },

    loginFunction: function(req, res){
        let userLogged = User.findByField('username', req.body.username);
        if (userLogged){
            let passwordCompare = bcrypt.compareSync(req.body.password, userLogged.password)
            if(passwordCompare){
                delete userLogged.password;
                req.session.userLogged = userLogged;
                res.cookie('username', req.body.username, {maxAge: (1000 * 60) * 15})
                res.redirect('/user/profile')
            }
            else{
                res.render('./user/login', {
                    errors: {
                        username: {
                            msg: "Las credenciales son invalidas"
                        }
                    },
                    name: 'styles', title: 'Login'
                })
                res.render('./user/login', {
                    errors: {
                        username: {
                            msg: "No se encuentra este usuario registrado"
                        }
                    },
                    name: 'styles', title: 'Login'
                })
            }
            
        }

        
    },

    register: function(req, res){
        res.render('./user/register', {name: 'styles', title: 'Registro'});
    },

    registerFunction: function(req, res){
        const resultValidation = validationResult(req);

        let mailInDB = User.findByField('email', req.body.email);
        let usernameInDB = User.findByField('username', req.body.username);

        if(resultValidation.errors.length > 0){
            res.render('./user/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
                name: 'styles', title: 'HOME'
            })
        }
        
        if(mailInDB){
            return res.render('./user/register', {
                errors: {
                    email:{
                        msg: "Este mail ya esta en uso"
                    }
                },
                oldData: req.body,
                name: 'styles', title: 'HOME'
            })
        }
        if(usernameInDB){
            return res.render('./user/register', {
                errors: {
                    username:{
                        msg: "Este nombre de usuario ya esta en uso"
                    }
                },
                oldData: req.body,
                name: 'styles', title: 'Registro'
            })
        }

        delete req.body.pswRepeat;
        let userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password)
        }
        User.create(userToCreate)
		delete userToCreate.password;
                req.session.userLogged = userToCreate;
                res.cookie('username', req.body.username, {maxAge: (1000 * 60) * 15})
                res.redirect('/user/profile')
             
    },

    logout: function(req, res){
        res.clearCookie('username')
        req.session.destroy();
        res.redirect('/')
    }
}

module.exports = usersController;