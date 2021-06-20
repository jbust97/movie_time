const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require('./app/models');

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
require("./app/routes/room.routes")(app);
app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto 9090");
});