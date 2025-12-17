"use client";

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    /* w-full: Asegura el ancho completo.
       sticky top-0 z-50: La mantiene fija arriba mientras haces scroll.
    */
    <nav className="w-full sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <h1 className="text-xl font-bold text-blue-600">Postulaciones App</h1>

      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <div className="flex flex-col items-end">
              <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Usuario</span>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {session.user.name}
              </span>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm font-semibold bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all active:scale-95"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <span className="text-sm text-zinc-500 italic">No identificado</span>
        )}
      </div>
    </nav>
  );
}
