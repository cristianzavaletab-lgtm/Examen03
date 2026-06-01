"use client";

import { useState, useEffect } from "react";
import { Product, ProductFormData } from "@/types/product";

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  editProduct: Product | null;
  onCancel: () => void;
  loading: boolean;
}

export default function ProductForm({ onSubmit, editProduct, onCancel, loading }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name,
        description: editProduct.description || "",
        price: editProduct.price,
        stock: editProduct.stock,
      });
    } else {
      setFormData({ name: "", description: "", price: 0, stock: 0 });
    }
  }, [editProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {editProduct ? "Editar Producto" : "Agregar Producto"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Nombre del Producto
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Laptop Gaming"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
              required
              minLength={3}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Descripcion
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descripcion del producto..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Precio (S/.)
            </label>
            <input
              type="number"
              value={formData.price || ""}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
              step="0.01"
              min="0.01"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Stock
            </label>
            <input
              type="number"
              value={formData.stock || ""}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
              placeholder="0"
              min="0"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Procesando..." : editProduct ? "Actualizar Producto" : "Crear Producto"}
          </button>
          {editProduct && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {!editProduct && (
        <p className="mt-3 text-sm text-gray-400">
          La imagen del producto se obtiene automaticamente desde la API externa (Lorem Picsum).
        </p>
      )}
    </div>
  );
}
