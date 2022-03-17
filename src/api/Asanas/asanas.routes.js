const AsanaRoutes = require('express').Router();
// Importación en ES5 - Métodos de controller
const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./asanas.controller');
// Traer todos los actores en el endpoint /all
AsanaRoutes.get('/', getAll);
// Traer Actor por id
AsanaRoutes.get('/:id', getOne);
// Crear un actor POST
AsanaRoutes.post('/', postOne);
// Modificar Actor
AsanaRoutes.patch('/:id', patchOne);
// Delete Actor
AsanaRoutes.delete('/:id', deleteOne);

module.exports = AsanaRoutes;