const express = require("express");
const mariadb = require("mariadb");
const cors = require('cors');
const multer = require("multer");




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



const storage = multer.diskStorage({
  destination:(req, file, cb) =>{
     cb(null, "frontend/imagenes/baños/")
  },
  filename:(req, file, cb) =>{
    cb(null,  file.originalname);
  }
})


const upload = multer({storage});


app.post("/upload", upload.single("file"), async(req,res) =>{
  res.send({data:"Imagen Cargada"})

})


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

  //----------------------------------------- Correos -------------------------------//

  // Get que trae los datos de la db con los correos
  app.get("/correos", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT * FROM correos"
      );
  
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Se rompió el servidor" });
    } finally {
      if (conn) conn.release(); //release to pool
    }
  });



  
app.post("/enviarCorreo", async (req, res) => {

  const{correo} = req.body
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO correos (correo) VALUE(?)`,
      [req.body.correoNuevo]
    );


    res.json({ id: parseInt(response.insertId), ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});




app.delete("/eliminarCorreo/:id", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("DELETE FROM correos WHERE id=?", [
      req.params.id,
    ]);
    res.json({ message: "Elemento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});



  //----------------------------------------- Imagenes -------------------------------//


app.post("/enviarImagen", async (req, res) =>{

  const{correo} = req.body
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO baños (nombre) VALUE(?)`,
      [req.body.nombre]
    );


    res.json({ id: parseInt(response.insertId), ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }

})


app.get("/traerImagen", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM baños"
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