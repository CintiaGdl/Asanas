//importamos mongoose
const mongoose = require('mongoose');
//creamos SCHEMA es el método mediante el cual vamos a definir nuestro modelo de datos
const asanaSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true},
        description: { type: String, required: false, trim: true},
    },
    {
        timestamps: true,
    }
)

//guardamos la asana y el schema, asanas es el nombre de mi colección en la DB
const Asana = mongoose.model('asanas', asanaSchema);
//exportamos
module.exports = Asana;