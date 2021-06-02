exports.proyectosHome = (req, res) => {
    res.render('index', {
        nombrePagina: 'Proyectos'
    });
}

exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo proyecto'
    })
}

exports.nuevoProyecto = (req, res) => {
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
            errores
            // proyectos
        })
    } else {
        console.log('else');

        // No hay errores
        // Insertar en la BD.
        //  const usuarioId = res.locals.usuario.id;
        //  await Proyectos.create({ nombre, usuarioId });
        //  res.redirect('/');
    }
}