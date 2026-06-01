"use client";

import { useState, useEffect, useCallback } from "react";
import { Product, ProductFormData } from "@/types/product";
import * as productService from "@/services/productService";
import ProductCard from "@/components/ProductCard";
import ProductForm from "@/components/ProductForm";
import DeleteModal from "@/components/DeleteModal";
import Toast from "@/components/Toast";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadProducts = useCallback(async () => {
    try {
      const result = await productService.getProducts();
      if (result.success && result.data) {
        setProducts(result.data);
      }
    } catch {
      showToast("Error al conectar con el servidor", "error");
    } finally {
      setPageLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleCreate = async (data: ProductFormData) => {
    setLoading(true);
    try {
      const result = await productService.createProduct(data);
      if (result.success) {
        showToast("Producto creado correctamente", "success");
        loadProducts();
        setEditProduct(null);
      } else {
        showToast(result.details?.join(", ") || result.message || "Error", "error");
      }
    } catch {
      showToast("Error al crear producto", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: ProductFormData) => {
    if (!editProduct) return;
    setLoading(true);
    try {
      const result = await productService.updateProduct(editProduct.id, data);
      if (result.success) {
        showToast("Producto actualizado correctamente", "success");
        loadProducts();
        setEditProduct(null);
      } else {
        showToast(result.details?.join(", ") || result.message || "Error", "error");
      }
    } catch {
      showToast("Error al actualizar producto", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const result = await productService.deleteProduct(deleteId);
      if (result.success) {
        showToast("Producto eliminado correctamente", "success");
        loadProducts();
      } else {
        showToast(result.message || "Error al eliminar", "error");
      }
    } catch {
      showToast("Error al eliminar producto", "error");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div>
      {/* Formulario */}
      <ProductForm
        onSubmit={editProduct ? handleUpdate : handleCreate}
        editProduct={editProduct}
        onCancel={() => setEditProduct(null)}
        loading={loading}
      />

      {/* Lista de productos */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Productos ({products.length})
        </h2>
        <button
          onClick={loadProducts}
          className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
        >
          Recargar
        </button>
      </div>

      {pageLoading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-500">Cargando productos...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <p className="text-gray-400 text-lg">No hay productos registrados.</p>
          <p className="text-gray-400">Agrega uno usando el formulario de arriba.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={setEditProduct}
              onDelete={setDeleteId}
            />
          ))}
        </div>
      )}

      {/* Modal de eliminacion */}
      <DeleteModal
        show={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
