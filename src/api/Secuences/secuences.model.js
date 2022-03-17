//importamos mongoose
const mongoose = require('mongoose');
//creamos SCHEMA es el método mediante el cual vamos a definir nuestro modelo de datos
const secuenceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true},
        level: { type: String, required: false, trim: true},
        asanas : [{ type: mongoose.Schema.Types.ObjectId, ref: "asanas", required: true }]
    },
    {
        timestamps: true,
    }
)

//guardamos la asana y el schema, asanas es el nombre de mi colección en la DB
const Secuence = mongoose.model('secuences', secuenceSchema);
//exportamos
module.exports = Secuence;