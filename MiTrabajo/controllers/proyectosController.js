const Proyectos = require('../models/Proyectos');
// const slug = require('slug');

exports.proyectosHome = async(req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async(req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async(req, res) => {
    console.log('pasa');

    // validar que tengamos algo en el input
    const nombre = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un Nombre al Proyecto' })
    }

    // si hay errores
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        console.log('else');


        // No hay errores
        // Insertar en la BD.
        //  const usuarioId = res.locals.usuario.id;
        // const url = slug(nombre).toLocaleLowerCase();
        const proyecto = await Proyectos.create({ nombre, url });
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async(req, res, next) => {
    const proyectosPromise = await Proyectos.findAll();

    const proyectoPromise = await Proyectos.findOne({
        where: {
            id: req.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    if (!proyecto) return next();

    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos
    })
}

exports.formularioEditar = async(req, res) => {

    const proyectosPromise = await Proyectos.findAll();

    const proyectoPromise = await Proyectos.findOne({
        where: {
            url: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    res.render('nuevoProyecto', {
        nombrePagina: 'Editar proyecto',
        proyectos,
        proyecto
    })
}