export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  created_at?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  details?: string[];
}
