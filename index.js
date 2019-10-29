const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser'); //Nospermite leer datos del fomrulario, es parte de express

// crear conexion a la base de datos
const db = require('./config/db');
require('./models/Proyectos');
db.sync()
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

// Habilitamos bodyPArser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas para el home
app.use('/', routes());

// Especificamos el puerto
app.listen(3000);