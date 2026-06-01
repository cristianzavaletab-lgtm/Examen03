import { Product, ProductFormData, ApiResponse } from "@/types/product";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export async function getProducts(): Promise<ApiResponse<Product[]>> {
  const res = await fetch(`${API_BASE}/api/products`, {
    cache: "no-store",
  });
  return res.json();
}

export async function getProductById(id: number): Promise<ApiResponse<Product>> {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function createProduct(data: ProductFormData): Promise<ApiResponse<Product>> {
  const res = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateProduct(id: number, data: ProductFormData): Promise<ApiResponse<Product>> {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteProduct(id: number): Promise<ApiResponse<null>> {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
