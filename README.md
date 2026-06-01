# Ecommerce - Practica Calificada N03

Sistema de ecommerce completo con backend en Express.js, base de datos MySQL y frontend en Next.js. El sistema permite gestionar productos con operaciones CRUD y consume una API externa (Lorem Picsum) para obtener imagenes automaticamente al crear productos.

## Tecnologias

| Componente | Tecnologia |
|-----------|-----------|
| Backend | Express.js 5, Node.js |
| Base de Datos | MySQL (Railway) |
| Frontend | Next.js 14, React 18, Tailwind CSS |
| API Externa | Lorem Picsum (https://picsum.photos) |
| Validacion | Joi |
| HTTP Client | Axios |
| Despliegue | Render |

## Estructura del Proyecto

```
Examen03/
├── backend/                          # API REST con Express.js
│   ├── src/
│   │   ├── app.js                    # Servidor principal
│   │   ├── config/db.js             # Conexion a MySQL
│   │   ├── controllers/             # Logica CRUD + API externa
│   │   ├── middlewares/             # Logger + Error handler
│   │   ├── routes/                  # Rutas REST
│   │   └── validations/            # Schemas Joi
│   ├── public/                      # Frontend estatico (alternativo)
│   ├── database.sql                 # Script para crear la tabla
│   ├── package.json
│   └── README.md
├── frontend/                         # Interfaz con Next.js
│   ├── src/
│   │   ├── app/                     # Pages (App Router)
│   │   ├── components/              # Componentes React
│   │   ├── services/                # Llamadas a la API
│   │   └── types/                   # TypeScript interfaces
│   ├── package.json
│   └── next.config.js
└── README.md
```

## Instalacion Local

### Prerrequisitos
- Node.js v18+
- MySQL (local o remoto)

### 1. Clonar el repositorio
```bash
git clone https://github.com/cristianzavaletab-lgtm/Examen03.git
cd Examen03
```

### 2. Configurar Backend
```bash
cd backend
npm install
```

Crear archivo `.env`:
```env
PORT=3001
MYSQLHOST=tu_host
MYSQLUSER=root
MYSQLPASSWORD=tu_password
MYSQLDATABASE=railway
MYSQLPORT=3306
```

### 3. Crear tabla en MySQL
```sql
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Configurar Frontend
```bash
cd frontend
npm install
```

Crear archivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 5. Ejecutar en desarrollo

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Disponible en: http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Disponible en: http://localhost:3000

## URL del Proyecto en Linea

- **Backend API:** https://examen03-backend.onrender.com
- **Frontend:** https://examen03-frontend.vercel.app

## Endpoints de la API

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/products | Listar todos los productos |
| GET | /api/products/:id | Obtener producto por ID |
| POST | /api/products | Crear producto (imagen automatica desde API externa) |
| PUT | /api/products/:id | Actualizar un producto |
| DELETE | /api/products/:id | Eliminar un producto |

## Ejemplos de Uso

### Crear producto
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Gaming",
    "description": "Laptop de alto rendimiento",
    "price": 2500.00,
    "stock": 10
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Producto creado correctamente",
  "data": {
    "id": 1,
    "name": "Laptop Gaming",
    "description": "Laptop de alto rendimiento",
    "price": 2500.00,
    "stock": 10,
    "image_url": "https://picsum.photos/id/142/4272/2848.jpg"
  }
}
```

> La imagen se obtiene automaticamente consumiendo la API externa de Lorem Picsum con Axios.

### Listar productos
```bash
curl http://localhost:3001/api/products
```

### Actualizar producto
```bash
curl -X PUT http://localhost:3001/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Gaming Pro",
    "description": "Version actualizada",
    "price": 2800.00,
    "stock": 8
  }'
```

### Eliminar producto
```bash
curl -X DELETE http://localhost:3001/api/products/1
```

## Consumo de API Externa

Al crear un producto (`POST /api/products`), el backend:
1. Valida los datos con Joi
2. Hace una peticion GET con Axios a `https://picsum.photos/id/{random}/info`
3. Obtiene la `download_url` de la imagen
4. Guarda el producto en MySQL con la imagen obtenida

## Validaciones (Joi)

- `name`: obligatorio, minimo 3 caracteres, maximo 100
- `description`: obligatorio (puede estar vacio)
- `price`: obligatorio, numero positivo
- `stock`: obligatorio, entero >= 0

## Autor

**Cristian Emerson Zavaleta Burgos** - Tecsup 2026
