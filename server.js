const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require('./app/models');
const socketIO = require('./app/websocket');

db.sequelize.sync({alter: true});
//db.sequelize.sync({alter: true});

var corsOptions = {
    origin: "http://localhost:3000"
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
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
});
socketIO.io = io;
io.on('connection',()=>{
    console.log("I'm connected to a socket!");
})          
server.listen(PORT);


require("./app/routes/room.routes")(app);
