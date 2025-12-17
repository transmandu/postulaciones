"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import bcrypt from "bcrypt"; // 1. Importar bcrypt

const schema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  dni: z.string().min(5, "DNI muy corto").max(20, "DNI muy largo"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"), // 2. Validar password
});

export type DirectorFormState = { error?: string };

export async function createDirector(
  _prevState: DirectorFormState,
  formData: FormData
): Promise<DirectorFormState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    dni: formData.get("dni"),
    password: formData.get("password"), // 3. Obtener password
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  try {
    // 4. Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

    await prisma.user.create({
      data: {
        name: parsed.data.name,
        dni: parsed.data.dni,
        password: hashedPassword, // 5. Guardar la versión encriptada
      }
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') return { error: "Ese DNI ya está registrado." };
    }
    return { error: "No se pudo registrar el director." };
  }

  revalidatePath("/directores");
  redirect(`/directores`); // Ajusta la ruta según tu necesidad
}
