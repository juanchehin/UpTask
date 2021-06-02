const express = require('express');
const routes = require('./routes');
const path = require('path');


// Crear una app de express
const app = express();

// Archivos estaticos
app.use(express.static('public'));

// Habilitamos pug
app.set('view engine', 'pug');

// Carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

app.use('/', routes());

app.listen(3000);