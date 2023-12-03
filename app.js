const express = require("express");
const mariadb = require("mariadb");
const cors = require('cors');



const pool = mariadb.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "51195765",
  database: process.env.DB_NAME || "baldosas",
  connectionLimit: 5,
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("<h1>Bienvenid@ al servidor</h1>");
  });


  app.get("/mosaicos", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT * FROM mosaicos"
      );
  
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Se rompió el servidor" });
    } finally {
      if (conn) conn.release(); //release to pool
    }
  });



  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });


  process.on('SIGINT', () => {
    pool.end(); // Cierra la conexión de la piscina antes de salir
    console.log('Aplicación apagada de forma grácil');
    process.exit(0);
  });