//importamos el model de asanas
const Secuence = require('./secuences.model');

//método para recuperar todos las asanas de la DB
const getAll = async (req, res, next) => {
    try {
        //recuperamos todas las asanas con el método find de mongoose
        const secuences = await Secuence.find().populate('asanas');
        //res lo que enviamos al front status 200 todo ok cuerpo asanas en formato json
        res.status(200).json(secuences);
    } catch (error) {
        return next(error)
    }
}

//método para recuperar una secuence de la DB
const getOne = async (req, res, next) => {
    try {
        //req recupera valores de la request de la url...10 guardamos el id mediante destructuring
        const { id } = req.params;
        //findById por parametro recibe un id y lo busca
        const secuence = await Secuence.findById(id).populate('asanas');
        res.status(200).json(secuence);
    } catch (error) {
        return next(error)
    } 
}

//método para crear una nueva secuence
const postOne = async (req, res, next) => {
    try {
        //variable para introducir los datos desde el front
        const secuence = new Secuence();
        //el body es la info que nos llega desde el front
        secuence.name = req.body.name;
        secuence.level = req.body.level;
        secuence.asanas = req.body.asanas;
        //guardamos la info nueva mediante el metodo de mongoose save
        const secuenceDB = await secuence.save();
        return res.status(201).json(secuenceDB);
    } catch (error) {
        return next(error)
    }
}

//metodo para modificar una asana en base a su id
const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const secuence = new Secuence(req.body);
        secuence._id = id;
        const updateSecuence = await Secuence.findByIdAndUpdate(id, secuence);
        return res.status(200).json(updateSecuence);
    } catch (error) {
        return next(error);
    }
}

//metodo para eliminar en base a su id
const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const secuence = await Secuence.findByIdAndDelete(id);
        return res.status(200).json(secuence);
    } catch (error) {
        return next(error);
    } 
}

module.exports = {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
}