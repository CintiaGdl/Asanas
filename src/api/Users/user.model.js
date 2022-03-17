//importamos mongoose y bcrypt para encriptar nuestras contraseñas
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//importamos nuestros validadores:
// const { validationPassword, validationEmail } = require('../../utils/validators/validators');

//configuramos esquema del user
const userSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true }
});

//método mongoose para guardar poder encriptar y guardar las contraseñas
userSchema.pre("save", function(next) {
   /*  if (!validationPassword(this.password)) {
        //TODO
        return next(new Error());
    }
    if (!validationEmail(this.email)) {
        //TODO
        return next(new Error());
    } */
    //método bcrypt para encriptar la contraseña hashSync, param1 qué param2 nº saltos de encriptación
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

//configuramos User
const User = mongoose.model('users', userSchema);
//exportamos
module.exports = User;