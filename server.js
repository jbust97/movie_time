const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

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
app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

const PORT = process.env.PORT || 9090;

app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto 9090");
});