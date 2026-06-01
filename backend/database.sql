CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo
INSERT INTO products (name, description, price, stock, image_url) VALUES
('Laptop Gaming', 'Laptop de alto rendimiento para gaming', 2500.00, 10, 'https://picsum.photos/seed/laptop/500/400'),
('Mouse Inalambrico', 'Mouse ergonomico con sensor de alta precision', 45.99, 50, 'https://picsum.photos/seed/mouse/500/400'),
('Monitor 4K', 'Monitor IPS de 27 pulgadas', 899.00, 15, 'https://picsum.photos/seed/monitor/500/400');
