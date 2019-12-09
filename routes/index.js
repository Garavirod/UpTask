const express = require('express');
const router = express.Router();

// Importamos express validator para sanitizar el documento
const { body } = require('express-validator/check');

// Importamos los controladores
const proyectosController = require('../controllers/proyectosController');

//Exportamos las rutas
module.exports = function() {
    router.get('/', proyectosController.proyectosHome); //Midlle de express funciones que se ejecytan una tras otra 
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(), //Sanitizamos el camṕo 'nombre'
        proyectosController.nuevoProyecto
    );
    // Listar proyectos
    // :url es un comidín, el nombre puede cambiar a lo que sea minetras tenga el comodín ':'
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
    return router;
}