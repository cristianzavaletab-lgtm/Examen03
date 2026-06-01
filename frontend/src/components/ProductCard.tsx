"use client";

import { Product } from "@/types/product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={product.image_url || "https://picsum.photos/seed/default/500/400"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {product.description || "Sin descripcion"}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-indigo-600">
            S/. {Number(product.price).toFixed(2)}
          </span>
          <span className="text-sm text-gray-400">
            Stock: {product.stock}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
