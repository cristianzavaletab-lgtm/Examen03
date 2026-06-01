const API_URL = "/api/products";

let deleteId = null;

// Elementos del DOM
const form = document.getElementById("product-form");
const formTitle = document.getElementById("form-title");
const productIdInput = document.getElementById("product-id");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const stockInput = document.getElementById("stock");
const btnSubmit = document.getElementById("btn-submit");
const btnCancel = document.getElementById("btn-cancel");
const productsGrid = document.getElementById("products-grid");
const productCount = document.getElementById("product-count");
const modal = document.getElementById("modal");
const btnConfirmDelete = document.getElementById("btn-confirm-delete");
const btnCancelDelete = document.getElementById("btn-cancel-delete");

// Cargar productos al iniciar
document.addEventListener("DOMContentLoaded", loadProducts);

// Eventos
form.addEventListener("submit", handleSubmit);
btnCancel.addEventListener("click", resetForm);
btnConfirmDelete.addEventListener("click", confirmDelete);
btnCancelDelete.addEventListener("click", () => (modal.style.display = "none"));

// Cargar todos los productos
async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    if (result.success) {
      productCount.textContent = result.count;
      renderProducts(result.data);
    } else {
      productsGrid.innerHTML = '<p class="no-products">Error al cargar productos</p>';
    }
  } catch (error) {
    productsGrid.innerHTML = '<p class="no-products">Error de conexion con el servidor</p>';
  }
}

// Renderizar productos en el grid
function renderProducts(products) {
  if (products.length === 0) {
    productsGrid.innerHTML = '<p class="no-products">No hay productos registrados. Agrega uno!</p>';
    return;
  }

  productsGrid.innerHTML = products
    .map(
      (product) => `
    <div class="product-card">
      <img src="${product.image_url}" alt="${product.name}" onerror="this.src='https://picsum.photos/seed/fallback/500/400'">
      <div class="card-body">
        <h3>${product.name}</h3>
        <p class="description">${product.description || "Sin descripcion"}</p>
        <p class="price">S/. ${Number(product.price).toFixed(2)}</p>
        <p class="stock">Stock: ${product.stock} unidades</p>
        <div class="card-actions">
          <button class="btn btn-edit" onclick="editProduct(${product.id})">Editar</button>
          <button class="btn btn-delete" onclick="deleteProduct(${product.id})">Eliminar</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Crear o actualizar producto
async function handleSubmit(e) {
  e.preventDefault();

  const productData = {
    name: nameInput.value.trim(),
    description: descriptionInput.value.trim(),
    price: parseFloat(priceInput.value),
    stock: parseInt(stockInput.value),
  };

  const id = productIdInput.value;

  try {
    let response;
    if (id) {
      // Actualizar
      response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    } else {
      // Crear
      response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    }

    const result = await response.json();

    if (response.ok) {
      showToast(result.message || "Operacion exitosa", "success");
      resetForm();
      loadProducts();
    } else {
      const errorMsg = result.details
        ? result.details.join(", ")
        : result.message;
      showToast(errorMsg, "error");
    }
  } catch (error) {
    showToast("Error de conexion con el servidor", "error");
  }
}

// Cargar datos de un producto para editar
async function editProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const result = await response.json();

    if (result.success) {
      const product = result.data;
      productIdInput.value = product.id;
      nameInput.value = product.name;
      descriptionInput.value = product.description || "";
      priceInput.value = product.price;
      stockInput.value = product.stock;

      formTitle.textContent = "Editar Producto";
      btnSubmit.textContent = "Actualizar Producto";
      btnCancel.style.display = "inline-block";

      // Scroll al formulario
      form.scrollIntoView({ behavior: "smooth" });
    }
  } catch (error) {
    showToast("Error al cargar producto", "error");
  }
}

// Mostrar modal de confirmacion para eliminar
function deleteProduct(id) {
  deleteId = id;
  modal.style.display = "flex";
}

// Confirmar eliminacion
async function confirmDelete() {
  if (!deleteId) return;

  try {
    const response = await fetch(`${API_URL}/${deleteId}`, {
      method: "DELETE",
    });
    const result = await response.json();

    if (response.ok) {
      showToast("Producto eliminado correctamente", "success");
      loadProducts();
    } else {
      showToast(result.message, "error");
    }
  } catch (error) {
    showToast("Error al eliminar producto", "error");
  }

  modal.style.display = "none";
  deleteId = null;
}

// Resetear formulario
function resetForm() {
  form.reset();
  productIdInput.value = "";
  formTitle.textContent = "Agregar Producto";
  btnSubmit.textContent = "Crear Producto";
  btnCancel.style.display = "none";
}

// Mostrar notificacion toast
function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideIn 0.3s ease reverse";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
