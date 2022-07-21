const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');


//REQUIRE
const mainRouter = require('./routes/mainRouter');
const usersRouter = require('./routes/usersRouter');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');



//CONFIG
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:'secreto',
    resave: false,
    saveUninitialized: false
}))
app.use(userLoggedMiddleware)


//SERVIDOR
app.listen(process.env.PORT || 3000, function(){
    console.log("Servidor corriendo");
})

//ROUTES
app.use('/', mainRouter);
app.use('/user', usersRouter);