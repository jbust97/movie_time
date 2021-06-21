const db = require("../models");
const axios = require("axios");
const Rooms = db.Rooms;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const room = {
        nombre: req.body.nombre,
    };

    // Guardamos a la base de datos
    
    Rooms.create(room).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Ha ocurrido un error al crear una room."
        }); 
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Rooms.findByPk(id).then(data => {     
        if (data){
            res.send(data);
        }
        else{
            res.status(404).send("Not found");
        }
    }).catch(err => {
        res.status(500).send({ 
            message: "Error al obtener room con id=" + id
        });
    });    
};

exports.findAll = (req,res) => {
    Rooms.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener todos las Rooom"
        });
    });
}

exports.update = (req,res) => {
    const id = req.params.id
    const room = {
        nombre: req.body.nombre,
        
    }
    Rooms.update(room, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar el room con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Rooms.destroy({
        where: {
            id: id
        } 
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar el room con id: " + id);
    })
}

exports.query = async (req,res) => {
    const title = req.query.title
    const url = "http://www.omdbapi.com/";
    const response = await axios.get(url,{params : {t: title, apikey: "7747d062",type: "movie"}});
    res.send(response.data);
}