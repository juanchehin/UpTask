const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

index = require('./routes/index'); // Mio

// Helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexion a la BD
const db = require('./config/db');
const { resolve } = require('path');

// Importo el modelo
require('./models/Proyectos');
require('./models/Tareas');


db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

// Crear una app de express
const app = express();

// Archivos estaticos
app.use(express.static('public'));

// Habilitamos pug
app.set('view engine', 'pug');

//
app.use(express.urlencoded({ extended: true }));

// Agregamos express-validator
app.use(expressValidator());


// Carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Flash messages
app.use(flash());

app.use(cookieParser());

// sessiones nos permiten navegar entre distintas paginas sin volvernos a autenticar
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

// Pasar var dump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    // res.locals.usuario = {...req.user} || null;
    next();
});

// Habilitamos bodyparser para leer datos del form
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// app.use('/', routes() ); // <- Da problemas , se reempla

app.use('/', index);

app.listen(3000);