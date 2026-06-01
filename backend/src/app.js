require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const productRoutes = require("./routes/productRoutes");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

// Servir archivos estaticos del frontend
app.use(express.static(path.join(__dirname, "../public")));

// Ruta para inicializar la base de datos (recrear tabla)
app.get("/api/setup", async (req, res) => {
  try {
    const pool = require("./config/db");
    // Eliminar tabla anterior si existe (tenia columnas incorrectas)
    await pool.query(`DROP TABLE IF EXISTS products`);
    // Crear tabla con la estructura correcta
    await pool.query(`
      CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    res.json({ success: true, message: "Tabla products recreada correctamente con columnas: id, name, description, price, stock, image_url, created_at" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Rutas de la API
app.use("/api/products", productRoutes);

// Ruta raiz - sirve el frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`,
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api/products`);
});
