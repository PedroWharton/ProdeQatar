const express = require("express");
const app = express();
const path = require("path");
const mainRouter = require('./routes/mainRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');


app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));

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


app.listen(process.env.PORT || 3000, function(){
    console.log("Servidor corriendo");
})

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/user', usersRouter);