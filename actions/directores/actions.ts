"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import bcrypt from "bcrypt";

// 1. Eliminamos 'password' del esquema de validación del formulario
const schema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  dni: z.string().min(5, "DNI muy corto").max(20, "DNI muy largo"),
});

export type DirectorFormState = { error?: string };

export async function createDirector(
  _prevState: DirectorFormState,
  formData: FormData
): Promise<DirectorFormState> {
  // 2. Validamos solo name y dni que vienen del formulario
  const parsed = schema.safeParse({
    name: formData.get("name"),
    dni: formData.get("dni"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  try {
    const { name, dni } = parsed.data;

    // 3. LA LÓGICA CLAVE: Usamos el 'dni' como contraseña
    // Le aplicamos el hash directamente al valor del DNI
    const hashedPassword = await bcrypt.hash(dni, 10);

    await prisma.user.create({
      data: {
        name: name,
        dni: dni,
        password: hashedPassword, // Guardamos el hash del DNI
      },
    });

  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') return { error: "Ese DNI ya está registrado." };
    }
    return { error: "No se pudo registrar el director." };
  }

  // 4. Revalidación y redirección
  revalidatePath("/");
  redirect(`/`);
}
