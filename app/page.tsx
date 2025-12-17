"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  // 1. Cambiamos el estado de email a dni
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 2. Enviamos "dni" en lugar de "email"
    const result = await signIn("credentials", {
      dni,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      setError("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans">
      <main className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">

        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Iniciar Sesión
          </h1>
        </div>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded-md text-sm mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              DNI
            </label>
            <input
              type="text" // Cambiado de email a text
              placeholder="Tu número de DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-700 cursor-pointer text-white font-semibold py-3 rounded-lg transition-colors shadow-md"
          >
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}
