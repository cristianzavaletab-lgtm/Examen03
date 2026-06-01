const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener mínimo 3 caracteres",
  }),

  description: Joi.string().allow("").required(),

  price: Joi.number().positive().required().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser mayor a 0",
  }),

  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "El stock debe ser un número",
    "number.min": "El stock no puede ser negativo",
  }),
});

module.exports = productSchema;