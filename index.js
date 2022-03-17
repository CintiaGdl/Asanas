//importamos express para gestionar mi server
const express = require('express');
//importamos cors para gestionar proxies o urls
const cors = require('cors');

//importamos nuestros endpoints
const AsanaRouters = require('./src/api/Asanas/asanas.routes')
const SecuenceRouters = require('./src/api/Secuences/secuences.routes')


//conectamos con la DB
const { connect } = require('./src/utils/database/db');

//inicializamos express
const app = express();

//ejecutamos la función de conexión para la DB
connect();


// Configuramos las cabeceras, todos los métodos que va a poder tener, la info de la petición y q permite credenciales
/* app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}) */

//configuramos proxies CORS
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

app.use('/', (req, res, next) => {
    return res.json('Mis EndPoints son /api/Asanas & /api/Secuences')
})

//seleccionamos un puerto y si no existe damos 8080
const PORT = process.env.PORT || 8080;

//creamos un escuchador para nuestro server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});


//creamos nuestro capturador de error
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

//errores de server 500 (status code)
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})
