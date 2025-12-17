"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link"; // Importante para la navegación interna

export default function LoginPage() {
  const [dni, setDni] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      dni: dni,
      password: dni, // Se envía el DNI como password automáticamente
      redirect: false,
    });

    if (result?.error) {
      setError("Número de identificación no registrado");
      setIsLoading(false);
    } else {
      router.push(`/directores/${dni}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans px-4">
      <main className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">

        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Bienvenido
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Ingresa tu cédula para acceder al sistema si ya estas registrado
          </p>
        </div>

        {error && (
          <p className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-md text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              DNI / Cédula
            </label>
            <input
              type="text"
              placeholder="Ej: 12345678"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black hover:bg-zinc-800 disabled:bg-zinc-400 text-white font-semibold py-3 rounded-lg transition-colors shadow-md mt-2"
          >
            {isLoading ? "Verificando..." : "Entrar"}
          </button>
        </form>

        {/* URL DE REGISTRO AÑADIDA AQUÍ */}
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/registrar_director"
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors underline-offset-4 hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
