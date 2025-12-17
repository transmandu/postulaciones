import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { dni: string } }
) {
  const dni = decodeURIComponent(params.dni).trim();

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
  req: Request,
  { params }: { params: { dni: string } }
) {
  const dni = decodeURIComponent(params.dni).trim();
  const { text } = await req.json();

  const director = await prisma.user.findUnique({ where: { dni }, select: { id: true } });
  if (!director) return NextResponse.json({ error: "Director no existe" }, { status: 404 });

  const created = await prisma.nomination.create({
    data: { text: String(text), directorId: director.id },
    select: { id: true, text: true, createdAt: true },
  });

  return NextResponse.json(created);
}
