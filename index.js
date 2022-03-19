//importamos express para gestionar mi server
const express = require('express');

//importamos cors para gestionar proxies o urls
const cors = require('cors');

//conectamos con la DB
const { connect } = require('./src/utils/database/db');

//importamos cloudinary
const { configCloudinary } = require('./src/utils/cloudinary/config');

//info API
const documentation = require('./src/utils/documentation/api.json');

//importamos nuestras rutas / endpoints
const AsanaRouters = require('./src/api/Asanas/asanas.routes');
const SecuenceRouters = require('./src/api/Secuences/secuences.routes');
const UserRoutes = require('./src/api/Users/user.routes');

//seleccionamos un puerto y si no existe damos 8080
const PORT = process.env.PORT || 8080;

//inicializamos express
const app = express();

//ejecutamos la función de conexión para la DB
connect();

//ejecutamos cloudinary
configCloudinary();

// Configuramos las cabeceras, todos los métodos que va a poder tener, la info de la petición y q permite credenciales
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

//configuramos proxies CORS, son las urls que le damos acceso a nuestra api
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true
}));

//configuramos el flujo de información y limitamos para evitar que la tumben por gran volumen de datos de carga
app.use(express.json({ limit: '5mb' }));

//sin codificar caracteres reservados que puedan tener un significado especial en la URI
app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}))

//cargamos las rutas, volvemos luego cuando estén creados los endpoints
app.use('/api/Asanas', AsanaRouters);
app.use('/api/Secuences', SecuenceRouters);
app.use('/api/Users', UserRoutes);

//documentation de nuestra api
app.use('/api', (req, res, next) => {
    return res.json(documentation);
});

//creamos un escuchador para nuestro server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});


//manejador de errores para rutas no encontradas:
app.use('*', (req, res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = 'Route not found';
    return next(error);
});

//errores de server 500 (status code)
app.use(function (err, req, res, next) {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

//ocultamos con q está realizada nuestra API, dificultamos ataques
app.disable('x-powered-by');

