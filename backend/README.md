# Ecommerce API - Backend

Sistema de ecommerce con backend en Express.js y base de datos MySQL. Permite gestionar productos con operaciones CRUD y consume una API externa (Lorem Picsum) para asignar imagenes automaticamente al crear productos.

## Tecnologias Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js 5** - Framework web
- **MySQL** - Base de datos relacional
- **Axios** - Cliente HTTP para consumo de API externa
- **Joi** - Validacion de datos
- **Morgan** - Logging HTTP
- **CORS** - Manejo de origenes cruzados
- **dotenv** - Variables de entorno

## Estructura del Proyecto

```
backend/
├── src/
│   ├── app.js                    # Punto de entrada principal
│   ├── config/
│   │   └── db.js                 # Configuracion de conexion MySQL
│   ├── controllers/
│   │   └── productController.js  # Logica de negocio (CRUD + API externa)
│   ├── middlewares/
│   │   ├── logger.js             # Middleware de logging personalizado
│   │   └── errorHandler.js       # Middleware de manejo de errores
│   ├── routes/
│   │   └── productRoutes.js      # Definicion de rutas REST
│   └── validations/
│       └── productValidation.js  # Esquemas de validacion con Joi
├── .env                          # Variables de entorno (no incluido en repo)
├── .gitignore
├── package.json
└── README.md
```

## Instalacion Local

### Prerrequisitos
- Node.js v18 o superior
- MySQL (local o remoto)

### Pasos

1. Clonar el repositorio:
```bash
git clone https://github.com/cristianzavaletab-lgtm/Examen03.git
cd ecommerce-examen/backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env` en la raiz del backend:
```env
PORT=3001
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=tu_password
MYSQLDATABASE=ecommerce
MYSQLPORT=3306
```

4. Crear la tabla en MySQL:
```sql
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Iniciar el servidor:
```bash
# Desarrollo (con hot reload)
npm run dev

# Produccion
npm start
```

## URL del Proyecto en Linea

**Produccion:** https://ecommerce-examen-backend.onrender.com

## Endpoints de la API

Base URL: `/api/products`

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/products | Listar todos los productos |
| GET | /api/products/:id | Obtener producto por ID |
| POST | /api/products | Crear producto (imagen automatica) |
| PUT | /api/products/:id | Actualizar un producto |
| DELETE | /api/products/:id | Eliminar un producto |

## Ejemplos de Llamadas a la API

### Listar todos los productos
```bash
curl GET https://ecommerce-examen-backend.onrender.com/api/products
```

**Respuesta:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Laptop Gaming",
      "description": "Laptop de alto rendimiento",
      "price": 2500.00,
      "stock": 10,
      "image_url": "https://fastly.picsum.photos/id/25/5000/3333.jpg..."
    }
  ]
}
```

### Obtener producto por ID
```bash
curl GET https://ecommerce-examen-backend.onrender.com/api/products/1
```

### Crear un producto (con imagen automatica desde API externa)
```bash
curl -X POST https://ecommerce-examen-backend.onrender.com/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teclado Mecanico",
    "description": "Teclado RGB con switches Cherry MX",
    "price": 150.99,
    "stock": 25
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Producto creado correctamente",
  "data": {
    "id": 3,
    "name": "Teclado Mecanico",
    "description": "Teclado RGB con switches Cherry MX",
    "price": 150.99,
    "stock": 25,
    "image_url": "https://fastly.picsum.photos/id/142/4272/2848.jpg?hmac=..."
  }
}
```

> La imagen se obtiene automaticamente desde la API externa de Lorem Picsum (https://picsum.photos).

### Actualizar un producto
```bash
curl -X PUT https://ecommerce-examen-backend.onrender.com/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Gaming Pro",
    "description": "Laptop de alto rendimiento actualizada",
    "price": 2800.00,
    "stock": 8
  }'
```

### Eliminar un producto
```bash
curl -X DELETE https://ecommerce-examen-backend.onrender.com/api/products/1
```

## Consumo de API Externa

Al crear un nuevo producto (`POST /api/products`), el sistema consume automaticamente la API de **Lorem Picsum** (`https://picsum.photos`) usando **Axios** para obtener una imagen aleatoria. La URL de la imagen se almacena en el campo `image_url` del producto.

Flujo:
1. El usuario envia los datos del producto (name, description, price, stock)
2. El backend hace una peticion GET a `https://picsum.photos/id/{random}/info`
3. La API retorna los datos de la imagen incluyendo `download_url`
4. Se guarda esa URL en la base de datos junto con el producto

## Validaciones

Se utiliza **Joi** para validar los datos de entrada:

- `name`: String, minimo 3 caracteres, maximo 100, obligatorio
- `description`: String, puede estar vacio, obligatorio
- `price`: Numero positivo, obligatorio
- `stock`: Numero entero >= 0, obligatorio

Si la validacion falla, se retorna un error 400 con los detalles.

## Manejo de Errores

- **400** - Error de validacion (datos invalidos)
- **404** - Producto no encontrado
- **500** - Error interno del servidor

Todos los errores siguen el formato:
```json
{
  "success": false,
  "message": "Descripcion del error",
  "details": ["detalle especifico"]
}
```

## Autor

Cristian Emerson Zavaleta Burgos - Tecsup 2026
