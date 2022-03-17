const AsanaRoutes = require('express').Router();
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
AsanaRoutes.post('/', postOne);
AsanaRoutes.patch('/:id', patchOne);
AsanaRoutes.delete('/:id', [isAuth], deleteOne);

module.exports = AsanaRoutes;