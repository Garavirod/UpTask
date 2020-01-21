const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.agregarTarea = async(req, res) => {
    // Buscamos un registro en la base de datos

    const Proyecto = await Proyectos.findOne({ where: { url: req.params.url } }); //findOne limita al primer resultado que encuentre

    // Leemos el valor del input

    const { tarea } = req.body;
    const estado = 0;
    const proyectoId = Proyecto.id;

    //  Insertamos en la base de datos la tarea al correspondiente proyecto
    const resultado = Tareas.create({ tarea, estado, proyectoId }); //Con el orden de la tabla en la BDD
    if (!resultado)
        return next();
    // Redirecionamos 
    res.redirect(`/proyectos/${req.params.url}`);
}