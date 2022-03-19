const AsanaRoutes = require('express').Router();
//importamos la subida de fotos con nuestro middleware
const upload = require('../../middlewares/updateFile.middleware');
// Importación en ES5 - Métodos de controller
const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./asanas.controller');

//importamos la autenticación
const { isAuth } = require('../../middlewares/auth.middleware')

//importamos nuestros endpoints de asanas
AsanaRoutes.get('/', getAll);
AsanaRoutes.get('/:id', getOne);
AsanaRoutes.post('/', [isAuth], upload.single('image'), postOne);
AsanaRoutes.patch('/:id', [isAuth], upload.single('image'), patchOne);
AsanaRoutes.delete('/:id', [isAuth], deleteOne);

module.exports = AsanaRoutes;