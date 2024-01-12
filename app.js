const express = require("express");
const mariadb = require("mariadb");
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;





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


const carpetaDestino = (req, file, cb) => {
  // Obtiene el destino desde el cuerpo de la solicitud (req.body)
  const destination = req.params.destination;
  const rutaCompleta = `frontend/imagenes/${destination}`
  cb(null, rutaCompleta);
};

const storage = multer.diskStorage({
  destination:  carpetaDestino,
  filename:(req, file, cb) =>{
    cb(null,  file.originalname);
  }
})




const upload = multer({storage});





app.post("/upload/:destination?", upload.single("file"), async(req,res) =>{
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


 app.post("/:sector", async (req, res) =>{
  const sector = req.params.sector
   let conn;
   try {
     conn = await pool.getConnection();
     const response = await conn.query(
       `INSERT INTO ${sector} (nombre) VALUE(?)`,
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





app.get('/:sector', async (req, res) => {
  const sector = req.params.sector;

  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT * FROM ${sector}`
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release();
  }
});





app.post('/url', async (req, res) => {
  let conn;
  try {
     conn = await pool.getConnection();
     const response = await conn.query(
        `INSERT INTO url (ruta) VALUE(?)`,
        [req.body.dato]
     );

     res.json({ id: parseInt(response.insertId), ...req.body });
  } catch (error) {
     console.log(error); // Agrega esta línea para registrar el error en la consola del servidor
     res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
     if (conn) conn.release(); //release to pool
  }
});







app.delete("/eliminarImagen/:sector/:id", async (req, res) => {

  const sector = req.params.sector;
  const id = req.params.id;

  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`DELETE FROM ${sector} WHERE id = ?`, [id]);
    res.json({ message: "Elemento eliminado correctamente de db" });
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




