const db = require("../models");
const axios = require("axios");
const socketIO = require("../websocket");

const Rooms = db.Rooms;
const Movies = db.Movies;
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
            err.message || "Cannot create room."
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
            message: "Cannot get room with id=" + id
        });
    });    
};

exports.findAll = (req,res) => {
    Rooms.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Cannot get all rooms"
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
            message: "Cannot update room with id: " + id
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
        res.status(500).send("Cannot delete room with id: " + id);
    })
}

exports.query = async (req,res) => {
    const title = req.query.title
    
    const url = "http://www.omdbapi.com/";
    try{
    const response = await axios.get(url,{params : {t: title, apikey: process.env["API_KEY"],type: "movie"}});
    res.send(response.data);
    }catch(e){
        res.status(500).send("Cannot get movies from external API");
    }
}

exports.queryId = async (req,res) => {
    const id = req.query.id
    
    const url = "http://www.omdbapi.com/";
    try{
    const response = await axios.get(url,{params : {i: id, apikey: process.env["API_KEY"],type: "movie"}});
    res.send(response.data);
    }catch(e){
        res.status(500).send("Cannot get movies from external API");
    }

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

exports.getMovies = async (req,res) => {
    const id = req.params.id
    try{
        const movies = await Movies.findAll({where: {RoomId: id}, order: [['votes','DESC']]});
        res.send(movies)
    }catch(e){
        console.log(e);
        res.status("500").send("Cannot get the movies of the room")
    }
}
