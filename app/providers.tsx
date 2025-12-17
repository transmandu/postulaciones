"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react"; // 1. Importamos NextAuth
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 10_000, retry: 1 } },
      })
  );

  return (
    // 2. Envolvemos todo con SessionProvider
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
