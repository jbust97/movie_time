const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require('./app/models');
const socketIO = require('./app/websocket');

db.sequelize.sync({alter: true});
//db.sequelize.sync({alter: true});

var corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.json({message: "My server is live"});
});


const PORT = process.env.PORT || 9090;

const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: "https://jbust97.github.io",
        methods: ["GET","POST"]
      }
});
socketIO.io = io;
socketIO.io.on('connection',(socket)=>{
    socket.on("join", msg => {
        socket.join(msg.roomCode);
        console.log("Supposedly joined " + msg.roomCode)
    });
    

});
 
    
    
server.listen(PORT);


require("./app/routes/room.routes")(app);
require("./app/routes/movie.routes")(app);
