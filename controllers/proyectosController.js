const Proyectos = require('../models/Proyectos');
const slug = require('slug');

exports.proyectosHome = (req, res) => {
    res.render('index', {
        nombrePagina: 'Proyectos'
    });
};

exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    });
};

exports.nuevoProyecto = async(req, res) => {
    // console.log(req.body);
    // Validamos que el fomrularo no esté vacio
    const { nombre } = req.body;
    let errores = [];
    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nomnbre al proyecto' })
    }
    // Si existen errores
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores
        })
    } else {
        const url = slug(nombre).toLocaleLowerCase();
        const proyecto = await Proyectos.create({ nombre, url }); //Diccionario de contexto
        // Una vez que se inserte el elemento que me lleve al home
        res.redirect('/');
    }
};