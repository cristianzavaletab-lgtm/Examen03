import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Store - Gestion de Productos",
  description: "Sistema de ecommerce con Express.js, MySQL y Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">Ecommerce Store</h1>
            <p className="text-indigo-100 mt-1">Sistema de gestion de productos</p>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          {children}
        </main>

        <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-auto">
          <p>Ecommerce API - Cristian Zavaleta Burgos | Tecsup 2026</p>
        </footer>
      </body>
    </html>
  );
}
