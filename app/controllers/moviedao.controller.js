const db = require("../models");
const socketIO = require("../websocket");

const Movies = db.Movies;
const Rooms = db.Rooms;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    
    const movie = {movie: req.body.movie, RoomId: req.body.RoomId}
    const room = await Rooms.findByPk(movie.RoomId);        

    // Guardamos a la base de datos  
    Movies.create(movie).then(data => {
        socketIO.io.to(room.code).emit("update");
        console.log("Broadcasting to room: "  + room.code);
        res.send(data);
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message:        
            err.message || "Error: Cannot create movie."
        }); 
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Movies.findByPk(id).then(data => {     
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
    Movies.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener todos las Rooom"
        });
    });
}

exports.vote = async (req,res) => {
    const id = req.params.id
    //Can be 1 or -1
    const value = req.query.value
    try{

    
    const movie = await Movies.findByPk(id)
    const room = await Rooms.findByPk(movie.RoomId)
    if(value == 1 || value == "1"){
        movie.increment("votes");
    }else{
        movie.decrement("votes");
    }
    socketIO.io.to(room.code).emit("update");
    console.log("Broadcasting to room: "  + room.code);
    res.status(200).send()
    }catch(e){
        console.log(e)
        res.status(500).send("Error: Cannot register vote update");
    }
   
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Movies.destroy({
        where: {
            id: id
        } 
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar el room con id: " + id);
    })
}

