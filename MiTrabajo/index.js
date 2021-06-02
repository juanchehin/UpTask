const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// Crear una app de express
const app = express();

// Archivos estaticos
app.use(express.static('public'));

// Habilitamos pug
app.set('view engine', 'pug');

// Carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Habilitamos bodyparser para leer datos del form
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


//
app.use('/', routes());

app.listen(3000);