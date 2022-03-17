//importamos el model de asanas
const Asana = require('./asanas.model');

//método para recuperar todos las asanas de la DB
const getAll = async (req, res, next) => {
    try {
        //recuperamos todas las asanas con el método find de mongoose
        const asanas = await Asana.find();
        //res lo que enviamos al front status 200 todo ok cuerpo asanas en formato json
        res.status(200).json(asanas);
    } catch (error) {
        return next(error)
    }
}

//método para recuperar una asana de la DB
const getOne = async (req, res, next) => {
    try {
        //req recupera valores de la request de la url...10 guardamos el id mediante destructuring
        const { id } = req.params;
        //findById por parametro recibe un id y lo busca
        const asana = await Asana.findById(id);
        res.status(200).json(asana);
    } catch (error) {
        return next(error)  
    } 
}

//método para crear una nueva asana
const postOne = async (req, res, next) => {
    try {
        //variable para introducir los datos desde el front
        const asana = new Asana();
        //el body es la info que nos llega desde el front
        asana.name = req.body.name;
        asana.description = req.body.description;
        //guardamos la info nueva mediante el metodo de mongoose save
        const asanaDB = await asana.save();
        return res.status(201).json(asanaDB);
    } catch (error) {
        return next(error)
    }
}

//metodo para modificar una asana en base a su id
const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const asana = new Asana(req.body);
        asana._id = id;
        const updateAsana = await Asana.findByIdAndUpdate(id, asana);
        return res.status(200).json(updateAsana);
    } catch (error) {
        return next(error);
    }
}

//metodo para eliminar en base a su id
const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const asana = await Asana.findByIdAndDelete(id);
        return res.status(200).json(asana);
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