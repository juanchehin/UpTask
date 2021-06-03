const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

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

    const proyectos = await Proyectos.findAll();

    // validar que tengamos algo en el input
    const nombre = req.body.nombre;

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

        console.log('nombre es : ', nombre);
        // No hay errores
        // Insertar en la BD.
        //  const usuarioId = res.locals.usuario.id;
        // const url = slug(nombre).toLocaleLowerCase();
        await Proyectos.create({ nombre });
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async(req, res, next) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });

    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    // Consultar tareas del Proyecto actual

    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        },
        // include: [
        //     { model: Proyectos }
        // ]
    });

    if (!proyecto) return next();
    // render a la vista
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.formularioEditar = async(req, res) => {

        const proyectosPromise = await Proyectos.findAll();

        const proyectoPromise = await Proyectos.findOne({
            where: {
                id: req.params.id
            }
        });

        const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

        res.render('nuevoProyecto', {
            nombrePagina: 'Editar proyecto',
            proyectos,
            proyecto
        })
    }
    /*
    exports.formularioEditar = async (req, res) => {
        const usuarioId = res.locals.usuario.id;
        const proyectosPromise = Proyectos.findAll({where: { usuarioId  }});

        const proyectoPromise = Proyectos.findOne({
            where: {
                id: req.params.id, 
                usuarioId
            }
        });
        const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise ]);

        // render a la vista
        res.render('nuevoProyecto', {
            nombrePagina : 'Editar Proyecto',
            proyectos,
            proyecto
        })
    }
    */

exports.actualizarProyecto = async(req, res) => {

    const proyectos = await Proyectos.findAll();

    // validar que tengamos algo en el input
    const nombre = req.body.nombre;

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

        console.log('nombre es : ', nombre);
        // No hay errores
        // Insertar en la BD.
        //  const usuarioId = res.locals.usuario.id;
        // const url = slug(nombre).toLocaleLowerCase();
        await Proyectos.update({ nombre }, { where: { id: req.params.id } });
        res.redirect('/');
    }
}

exports.eliminarProyecto = async(req, res, next) => {

    // req, query o params
    // console.log(req.query);
    const { urlProyecto } = req.query;

    const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });

    if (!resultado) {
        return next();
    }

    res.status(200).send('Proyecto Eliminado Correctamente');
}