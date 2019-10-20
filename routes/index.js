const express = require('express');
const router = express.Router();

// Importamos los controladores
const proyectosController = require('../controllers/proyectosController');

//Exportamos las rutas
module.exports = function() {
    router.get('/', proyectosController.proyectosHome); //Midlle de express funciones que se ejecytan una tras otra 
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', proyectosController.nuevoProyecto);
    return router;
}