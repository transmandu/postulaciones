"use client";

import { createDirector, type DirectorFormState } from "@/actions/directores/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { AlertCircle } from "lucide-react";

const initialState: DirectorFormState = {};

export default function NewDirectorPage() {
  const [state, action, isPending] = useActionState(createDirector, initialState);

  return (
    <main className="mx-auto max-w-lg p-6">
      <Card shadow-lg>
        <CardHeader>
          <CardTitle className="text-2xl">Registrar Director</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {state.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ej: Ana Pérez"
                required
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dni">DNI</Label>
              <Input
                id="dni"
                name="dni"
                placeholder="Ej: 12345678"
                required
                disabled={isPending}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Registrando..." : "Crear Cuenta"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
