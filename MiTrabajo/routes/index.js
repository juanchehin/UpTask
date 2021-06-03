const express = require('express');
const router = express.Router();

// Importar express validator
const { body } = require('express-validator/check');

// Importar el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');

// module.exports = function() {

// Ruta para el home
router.get('/', proyectosController.proyectosHome);
router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
router.post('/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
);

// Listar proyecto
router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

// Actualizar proyecto
router.get('/proyecto/editar/:id', proyectosController.formularioEditar);

router.post('/nuevo-proyecto/:id',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto
);

// return router;
// }

exports.formularioEditar = (req, res) => {

    // render a la vista
    res.render('nuevoProyecto', {
        nombrePagina: 'Editar proyecto'
    })
}

// Eliminar proyecto
router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

// Tareas
router.post('/proyectos/:url',
    // authController.usuarioAutenticado,
    tareasController.agregarTarea
);

// Actualizar Tareas
router.patch('/tareas/:id',
    // authController.usuarioAutenticado,
    tareasController.cambiarEstadoTarea
);

// Actualizar Tareas
router.delete('/tareas/:id',
    // authController.usuarioAutenticado,
    tareasController.eliminarTarea
);


module.exports = router;