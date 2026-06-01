const pool = require("../config/db");
const axios = require("axios");
const productSchema = require("../validations/productValidation");

/**
 * Obtiene una imagen aleatoria desde la API externa de Lorem Picsum.
 * Consume la API https://picsum.photos para obtener datos de una imagen random.
 * @returns {string} URL de la imagen obtenida desde la API externa
 */
const getImageFromExternalAPI = async () => {
  try {
    // Consumimos la API de Picsum para obtener una imagen aleatoria
    const response = await axios.get("https://picsum.photos/id/" + Math.floor(Math.random() * 200) + "/info");
    // La API retorna un objeto con la URL de descarga de la imagen
    return response.data.download_url;
  } catch (error) {
    console.error("Error al obtener imagen de API externa:", error.message);
    // Fallback: si la API externa falla, usamos una URL directa de Picsum
    return `https://picsum.photos/seed/${Date.now()}/500/400`;
  }
};

// GET /api/products - Listar todos los productos
exports.getProducts = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products ORDER BY id DESC");
    res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id - Mostrar producto por ID
exports.getProductById = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/products - Crear producto con imagen automatica desde API externa
exports.createProduct = async (req, res, next) => {
  try {
    // Validacion de datos con Joi
    const { error } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Error de validacion",
        details: error.details.map((d) => d.message),
      });
    }

    const { name, description, price, stock } = req.body;

    // Consumo de API externa para obtener imagen del producto
    const image_url = await getImageFromExternalAPI();

    const [result] = await pool.query(
      "INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, stock, image_url]
    );

    res.status(201).json({
      success: true,
      message: "Producto creado correctamente",
      data: {
        id: result.insertId,
        name,
        description,
        price,
        stock,
        image_url,
      },
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id - Actualizar un producto
exports.updateProduct = async (req, res, next) => {
  try {
    // Validacion de datos con Joi
    const { error } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Error de validacion",
        details: error.details.map((d) => d.message),
      });
    }

    const { name, description, price, stock } = req.body;

    const [result] = await pool.query(
      "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?",
      [name, description, price, stock, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    res.json({
      success: true,
      message: "Producto actualizado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id - Eliminar un producto
exports.deleteProduct = async (req, res, next) => {
  try {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    res.json({
      success: true,
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};
