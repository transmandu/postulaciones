"use client";

import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Barra de navegación con el nombre del usuario */}
      <Navbar />

      {/* Contenido Principal */}
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Dashboard de Postulaciones
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Mucho texto sin sentido bla bla bla 
            </p>
          </header>

        </div>
      </main>
    </div>
  );
}
