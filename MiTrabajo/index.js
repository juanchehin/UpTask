const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

index = require('./routes/index');

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

// Agregamos express-validator
app.use(expressValidator());

// Archivos estaticos
app.use(express.static('public'));

// Habilitamos pug
app.set('view engine', 'pug');

// Carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Pasar var dump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

// Habilitamos bodyparser para leer datos del form
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//
app.use(express.urlencoded({ extended: true }));

// app.use('/', routes() ); // <- Da problemas , se reempla

app.use('/', index);

app.listen(3000);