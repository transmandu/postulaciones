import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import DirectorView from "../view";

export default async function DirectorPage({ params }: { params: { dni: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const dni = decodeURIComponent(String(resolvedParams?.dni ?? "")).trim();
  if (!dni) notFound();

  const director = await prisma.user.findUnique({
    where: { dni },
    select: { id: true, name: true, dni: true, nominationsCreated: true },
  });

  if (!director) notFound();

  return <DirectorView director={director} />;
}
