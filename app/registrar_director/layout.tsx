import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  // Si no hay sesión, redirigir al login inmediatamente
  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6">
        {children}
      </div>
    </div>
  );
}
