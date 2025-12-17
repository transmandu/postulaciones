"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const schema = z.object({
  directorId: z.string().min(1),
  directorDni: z.string().min(1),
  text: z.string().min(3, "Escribe una postulación más clara").max(800, "Muy largo"),
});

export type CreateNominationState = { error?: string; success?: boolean };

export async function createNominationForDirector(
  _prev: CreateNominationState,
  formData: FormData
): Promise<CreateNominationState> {
  const parsed = schema.safeParse({
    directorId: formData.get("directorId"),
    directorDni: formData.get("directorDni"),
    text: formData.get("text"),
  });

  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };

  await prisma.nomination.create({
    data: {
      text: parsed.data.text,
      directorId: parsed.data.directorId,
    },
  });

  revalidatePath(`/directores/${parsed.data.directorDni}`);
  return { success: true };
}
