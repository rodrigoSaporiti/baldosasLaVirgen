const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");

const secretKey = "baldosaslv49122024";

// const pool = mariadb.createPool({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "51195765",
//   database: process.env.DB_NAME || "baldosas",
//   connectionLimit: 5,
// });

const pool = mariadb.createPool({
  host: "localhost",
  user: "baldosas_root",
  password: "T{j(eNz-,d*Y",
  database: "baldosas_baldosas",
  connectionLimit: 5,
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const carpetaDestino = (req, file, cb) => {
  // Obtiene el destino desde el cuerpo de la solicitud (req.body)
  const destination = req.params.destination;
  const rutaCompleta = `../public_html/imagenes/${destination}`;
  cb(null, rutaCompleta);
};

const storage = multer.diskStorage({
  destination: carpetaDestino,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get('/ab', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/upload/:destination?", upload.single("file"), async (req, res) => {
  res.send({ data: "Imagen Cargada" });
});

app.post("/upload/mosaicos", upload.single("file"), async (req, res) => {
  res.send({ data: "Imagen Cargada" });
});

app.get("/a", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

//----------------------------------------- ADMIN -------------------------------//

app.post("/login", (req, res) => {
  // Verifica las credenciales (puedes implementar tu lógica de autenticación aquí).
  const { username, password } = req.body;

  // Simulamos una autenticación exitosa
  if (username === "admin" && password === "baldosas4912") {
    // Crea un token
    const token = jwt.sign({ username }, secretKey);

    // Muestra el token en la consola del servidor
    console.log("Token de sesión:", token);

    // Puedes enviar el token al cliente si es necesario
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciales incorrectas" });
  }
});

function verificarToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ mensaje: "Acceso no autorizado" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: "token invalido" });
    }

    req.user = decoded;
    next();
  });
}

app.get("/crud", verificarToken, (rq, res) => {
  res.json({ mensaje: "bienvenido al area de admin" });
});

//----------------------------------------- Mosaicos -------------------------------//

app.get("/mosaicosDB", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM mosaicos");

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

app.get("/mosaicosDB/:sector", async (req, res) => {
  const sector = req.params.sector;

  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM mosaicos WHERE id=?", [
      sector,
    ]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

app.put("/mosaicos/:id", async (req, res) => {
  const id = req.params.id;
  const { titulo, img, tamaño, metro, peso } = req.body.datos;

  let conn;
  try {
    conn = await pool.getConnection();

    // Utilizamos placeholders (?) en la consulta y pasamos los valores como un array en el segundo parámetro de conn.query
    const sql =
      "UPDATE mosaicos SET titulo = ?, img = ?, tamaño = ?, metro = ?, peso = ? WHERE id = ?";
    const params = [titulo, img, tamaño, metro, peso, id];

    const result = await conn.query(sql, params);

    res.json({
      message: "Actualización exitosa",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release();
  }
});

app.post("/mosaicos", async (req, res) => {
  const { titulo, img, tamaño, metro, peso } = req.body.datos;

  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO mosaicos (titulo, img, tamaño, metro, peso) VALUE(?, ?, ?, ?, ?)`,
      [titulo, img, tamaño, metro, peso]
    );

    res.json({ id: parseInt(response.insertId), ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

app.post("/mosaicosImagenes/:sector", async (req, res) => {
  const nombre = req.body.nombre;
  const id = req.params.sector;

  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO imagenmosaico (ruta, IDimg) VALUE(?, ?)`,
      [nombre, id]
    );

    res.json({ id: parseInt(response.insertId), ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

app.get("/mosaicosImagenes/:sector", async (req, res) => {
  const sector = req.params.sector;

  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM imagenmosaico WHERE IDimg=?", [
      sector,
    ]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

app.delete("/eliminarImagen/mosaicosPrincipal/:id", async (req, res) => {
  const id = req.params.id;

  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`DELETE FROM mosaicos WHERE id = ?`, [id]);
    res.json({ message: "Elemento eliminado correctamente de db" });
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

app.delete("/eliminarImagen/mosaicos/:id", async (req, res) => {
  const id = req.params.id;

  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`DELETE FROM imagenmosaico WHERE id = ?`, [
      id,
    ]);
    res.json({ message: "Elemento eliminado correctamente de db" });
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
    const rows = await conn.query("SELECT * FROM correos");

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
    const response = await conn.query(`INSERT INTO correos (correo) VALUE(?)`, [
      req.body.correoNuevo,
    ]);

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

app.post("/:sector", async (req, res) => {
  const sector = req.params.sector;
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
});

app.get("/:sector", async (req, res) => {
  const sector = req.params.sector;

  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`SELECT * FROM ${sector}`);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release();
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

app.delete("/:ruta/:sector", async (req, res) => {
  const rutaArchivo = req.params.ruta;
  const sector = req.params.sector;

  const rutaTotal = `../public_html/imagenes/${sector}/${rutaArchivo}`;

  let conn;

  try {
    // Verificamos si el archivo existe
    await fs.access(rutaTotal);

    // Si existe, intentamos eliminarlo
    await fs.unlink(rutaTotal);

    res.json({ message: "Archivo eliminado correctamente" });
  } catch (error) {
    console.error(error);

    // Si hay algún error al acceder o eliminar el archivo, respondemos con un mensaje de error
    res.status(500).json({ message: "Error al eliminar el archivo" });
  }
});

app.delete("/:ruta", async (req, res) => {
  const rutaArchivo = req.params.ruta;

  const rutaTotal = `../public_html/imagenes/mosaicos/${rutaArchivo}`;

  let conn;

  try {
    // Verificamos si el archivo existe
    await fs.access(rutaTotal);

    // Si existe, intentamos eliminarlo
    await fs.unlink(rutaTotal);

    res.json({ message: "Archivo eliminado correctamente" });
  } catch (error) {
    console.error(error);

    // Si hay algún error al acceder o eliminar el archivo, respondemos con un mensaje de error
    res.status(500).json({ message: "Error al eliminar el archivo" });
  }
});





app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

process.on("SIGINT", () => {
  pool.end(); // Cierra la conexión de la piscina antes de salir
  console.log("Aplicación apagada de forma grácil");
  process.exit(0);
});
