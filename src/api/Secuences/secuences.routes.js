const SecuenceRoutes = require('express').Router();
// Importación en ES5 - Métodos de controller
const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./secuences.controller');
// Traer todos los actores en el endpoint /all
SecuenceRoutes.get('/', getAll);
// Traer Actor por id
SecuenceRoutes.get('/:id', getOne);
// Crear un actor POST
SecuenceRoutes.post('/', postOne);
// Modificar Actor
SecuenceRoutes.patch('/:id', patchOne);
// Delete Actor
SecuenceRoutes.delete('/:id', deleteOne);

module.exports = SecuenceRoutes;