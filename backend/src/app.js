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
