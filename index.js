const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser'); //Nos permite leer datos del fomrulario, es parte de express
const helpers = require('./helpers');
// crear conexion a la base de datos
const db = require('./config/db');

// Importamos los modelos
require('./models/Proyectos');
require('./models/Tareas');

db.sync() //Nos crea toda la estructura del modelo "Proyecto"
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

// crea una aplicacón de express
const app = express();

// Cargamos los archivos estáticos
app.use(express.static('public'));

// Habilitamos Pug
app.set('view engine', 'pug');

// Indicamos en que partse en van a enctroar las vistas.
app.set('views', path.join(__dirname, './views'));

// Pasar del vardump a la aplicación
app.use((req, res, next) => {
    /**
     * res.locals nos ayuda  a crear varibales en este archivo 
     * y consumirlo en cualquier otro, en este caso la funcion helpers.dump
     * 
     * next esta relacionada al meadlewere
     */
    res.locals.vardump = helpers.vardupm; //Lo hacemos visible para toda la aplicación
    next(); //una vez ejecutada la acción pasar al sig meadlewere
}); //Se ejecuta en todos los verbosd e http

// Habilitamos bodyPArser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas para el home
app.use('/', routes());

// Especificamos el puerto
app.listen(3000);