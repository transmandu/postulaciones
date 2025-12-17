"use client";

import { createDirector, type DirectorFormState } from "@/actions/directores/actions";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

const initialState: DirectorFormState = {};

export default function NewDirectorPage() {
  const [state, action] = useActionState(createDirector, initialState);
  return (
    <main className="mx-auto max-w-lg p-6">
      <Card>
        <CardHeader>
          <CardTitle>Registrar Director</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {state.error && (
            <Alert>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

         <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" placeholder="Ej: Ana Pérez" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dni">DNI</Label>
              <Input id="dni" name="dni" placeholder="Ej: 12345678" required />
            </div>

            {/* NUEVO CAMPO DE PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Crear
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
