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
// Declaramos una función asíncrona.
/*
 * puede contener una expresión await, 
 * la cual pausa la ejecución de la función asíncrona y 
 * espera la resolución de la Promise pasada y, a continuación, 
 * reanuda la ejecución de la función async y devuelve el valor resuelto.
 * 
 * simplificar aun más la forma en que trabajamos con las promesas,
 * Al hacer una función asíncrona va a retornan simpre una promesa. 
 * (Va a estar dentro de una promesa)
 * 
 * Lo primero que debemos de saber es que el operador await esperará hasta 
 * que la promesa sea resuelta, lo que provocará que el hilo de ejecución
 *  hasta que la promesa se resuelva, 
 * y una vez resuelta, el hilo de ejecución continuará donde se quedo.
 */
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