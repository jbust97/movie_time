const db = require("../models");
const axios = require("axios");
const socketIO = require("../websocket");

const Rooms = db.Rooms;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    
    const room = {}
    // Guardamos a la base de datos
    
    room.code = (Math.random().toString(36)+'00000000000000000').slice(2, 8)
    
    
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

exports.findByCode = (req,res) =>{
    const code = req.params.code
    Rooms.findOne({
        where: {
            code: code,
        }
    }).then(data => {
        if (data){
            res.send(data);
        }
        else{
            res.status(404).send("Room with code " + code  + " does not exist");

        }
    })
    .catch(err => res.status(500).send("Error retrieving room by code " + code))
}