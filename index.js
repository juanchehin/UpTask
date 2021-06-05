const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
// Importar variables
require('dotenv').config({ path: 'variables.env' })

index = require('./routes/index'); // Mio

// Helpers con algunas funciones
const helpers = require('./helpers');

// Crear la conexion a la BD
const db = require('./config/db');
const { resolve } = require('path');

// Importo el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

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



app.use(cookieParser());

// sessiones nos permiten navegar entre distintas paginas sin volvernos a autenticar
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

// agregar flash messages
app.use(flash());

// Pasar var dump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user } || null;
    next();
});

// Habilitamos bodyparser para leer datos del form
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// app.use('/', routes() ); // <- Da problemas , se reempla

app.use('/', index);


// Servidor y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});