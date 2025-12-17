import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Definimos el tipo para los parámetros asíncronos de Next.js 15
type RouteContext = {
  params: Promise<{ dni: string }>;
};

export async function GET(
  _req: NextRequest, // Cambiado a NextRequest por convención
  { params }: RouteContext
) {
  // En Next.js 15, debemos esperar a que los params se resuelvan
  const { dni: rawDni } = await params;
  const dni = decodeURIComponent(rawDni).trim();

  const director = await prisma.user.findUnique({
    where: { dni },
    select: {
      nominationsCreated: {
        orderBy: { createdAt: "desc" },
        select: { id: true, text: true, createdAt: true },
      },
    },
  });

  return NextResponse.json(director?.nominationsCreated ?? []);
}

export async function POST(
  req: NextRequest,
  { params }: RouteContext
) {
  const { dni: rawDni } = await params;
  const dni = decodeURIComponent(rawDni).trim();

  const { text } = await req.json();

  const director = await prisma.user.findUnique({
    where: { dni },
    select: { id: true }
  });

  if (!director) {
    return NextResponse.json({ error: "Director no existe" }, { status: 404 });
  }

  const created = await prisma.nomination.create({
    data: {
      text: String(text),
      directorId: director.id
    },
    select: { id: true, text: true, createdAt: true },
  });

  return NextResponse.json(created);
}
