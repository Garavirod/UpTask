const Sequelize = require('sequelize');
// Importamos la conconexion y configuracion de la base de datos
const db = require('../config/db');
// Importamos el slug
const slug = require('slug');
const shortid = require('shortid');

const Proyectos = db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(100),
    url: Sequelize.STRING(100)
}, {
    hooks: {
        // Los hooks corren una función end etermiando tiempo
        // Una función se se ejecutara antes de insettar en la base de datos
        beforeCreate(project) {
            console.log('Before inserting into DB');
            const url = slug(project.nombre).toLocaleLowerCase();
            project.url = `${url}-${shortid.generate()}`; //Guardamos la url con un idcorto
        }
    }
});
module.exports = Proyectos;