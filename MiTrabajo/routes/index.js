const express = require('express');
const router = express.Router();

// Importar express validator
const { body } = require('express-validator/check');

// Importar el controlador
const proyectosController = require('../controllers/proyectosController');
console.log('pasa index route');

// module.exports = function() {

// Ruta para el home
router.get('/', proyectosController.proyectosHome);
router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
router.post('/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
);

// Listar proyecto
// router.get('/proyectos/:url', proyectosController.proyectosPorUrl);

// Actualizar proyecto
router.get('/proyectos/editar/:url', proyectosController.formularioEditar);

// return router;
// }

exports.formularioEditar = (req, res) => {

    // render a la vista
    res.render('nuevoProyecto', {
        nombrePagina: 'Editar proyecto'
    })
}


/*router.get('/index', (req, res, next) => {
    res.send("I'm a test");
    next();
});*/

module.exports = router;