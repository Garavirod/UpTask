const Proyectos = require('../models/Proyectos');


exports.proyectosHome = async(req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
};

exports.formularioProyecto = async(req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
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
    const proyectos = await Proyectos.findAll();

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nomnbre al proyecto' })
    }
    // Si existen errores
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        // const url = slug(nombre).toLocaleLowerCase();
        const proyecto = await Proyectos.create({ nombre }); //Diccionario de contexto
        // Una vez que se inserte el elemento que me lleve al home
        res.redirect('/');
    }
};


exports.proyectoPorUrl = async(req, res, next) => {
    // res.send(req.params.url)
    // res.send('LISTO');
    /**Si tenemos múltiples consultas independientes podemos implmenatrr el código de la sig manera
     * en un arreglo de Promises
     */
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url //En el router debe contener la palabra id del comodin
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
    if (!proyecto) return next(); // De no haber proyecto, coramos aqui y pasamos al sig meddleware
    console.log(proyecto);
    // Renderizamos la vista
    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos
    });

}

exports.formularioEditar = async(req, res) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id //En el router debe contener la palabra id del comodin
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
    //Renderizamos con su diccionario de contexto
    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    });
}

exports.actualizarProyecto = async(req, res) => {
    // console.log(req.body);
    // Validamos que el fomrularo no esté vacio
    const { nombre } = req.body;
    let errores = [];
    const proyectos = await Proyectos.findAll();

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nomnbre al proyecto' })
    }
    // Si existen errores
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        // const url = slug(nombre).toLocaleLowerCase();
        await Proyectos.update({ nombre: nombre }, {
            where: { id: req.params.id }
        }); //Diccionario de contexto
        // Una vez que se inserte el elemento que me lleve al home
        res.redirect('/');
    }
};

// Eliminar Proyecto
exports.eliminarProyecto = async(req, res, next) => {
    // query params for reading what are you sending to server
    // console.log(req);
    const { urlProyecto } = req.query;
    const resultado = await Proyectos.destroy({
        where: { url: urlProyecto }
    });
    // if there exist an error between DB server and server
    if (!resultado)
        return next(); //Pasar al sigiente middleware y no muetsres la respuesta 200
    // res 200 verbo http que indica todo correcto
    res.status(200).send('project has been deleted succesfuly!');
}