//importamos libreria dotenv
const dotenv = require('dotenv');
//ejecutamos método para usar .env
dotenv.config();
//importamos libreria mongoose para conectar a DB
const mongoose = require('mongoose');
//importamos URI de mongo de .env
const mongoDb = process.env.MONGO_DB;

console.log(mongoDb);

//conexión asyncrona
const connect = async () => {
    try {
        //método mongoose para conectar con la DB y parsear los datos de la url.
        //primer param URI, segundo param configuración para parsear la url.
        const db = await mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true});
        //guardamos el nombre y el host mediante un destructuring
        const { name, host } = db.connection;
        console.log(`Conectado a la DB: ${name} en el host: ${host}`);
    } catch (error) {
        console.error(`No se ha podido conectar con la DB`, error)
    };
}

//exportamos nuestro connect para luego usarlo en index.js
module.exports = { connect };