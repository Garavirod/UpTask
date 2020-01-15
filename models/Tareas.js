const Sequelize = require('sequelize');
// Importamos la conconexion y configuracion de la base de datos
const db = require('../config/db');
const Proyectos = require('./Proyectos');


const Tareas = db.define('tareas', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(1)
});
// Creamos una relación de Tareas con proyectos, cada tarea pertene a un proyecto
Tareas.belongsTo(Proyectos);

//Proyectos.hasMany(Tareas); //Un proyecto tiene muchas tareas. (VA EN EL OTRO MODELO)
module.exports = Tareas;