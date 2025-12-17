"use client";

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <h1 className="text-xl font-bold text-blue-600">Postulaciones App</h1>

      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Bienvenido, <span className="font-bold text-black dark:text-white">{session.user.name}</span>
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded-md hover:bg-red-100 transition-colors"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <span className="text-sm text-zinc-500">No identificado</span>
        )}
      </div>
    </nav>
  );
}
