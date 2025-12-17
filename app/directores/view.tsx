"use client";

import { createNominationForDirector, type CreateNominationState } from "@/actions/postulaciones/actions";
import { useActionState, useMemo, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useFormStatus } from "react-dom";

type Props = {
  director: {
    id: string;
    name: string;
    dni: string;
    nominationsCreated: { id: string; text: string; createdAtISO: string; createdAtLabel: string }[];
  };
};

const initialState: CreateNominationState = {};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
}

export default function DirectorView({ director }: Props) {
  const [open, setOpen] = useState(false);

  const [state, action] = useActionState(createNominationForDirector, initialState)

  const directorInitials = useMemo(() => initials(director.name), [director.name]);

  const {pending} = useFormStatus()


  return (
    <main className="mx-auto max-w-4xl p-6 space-y-6 flex flex-col h-screen justify-center">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{directorInitials}</AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className="text-xl">{director.name}</CardTitle>
              <p className="text-sm text-muted-foreground">DNI: {director.dni}</p>
            </div>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Nueva postulación</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Crear postulación</DialogTitle>
              </DialogHeader>

              {state.error && (
                <Alert>
                  <AlertDescription>{state.error}</AlertDescription>
                </Alert>
              )}

              <form action={action} className="space-y-4">
                <input type="hidden" name="directorId" value={director.id} />
                <input type="hidden" name="directorDni" value={director.dni} />

                <div className="space-y-2">
                  <Label htmlFor="text">Postulado</Label>
                  <Input
                    id="text"
                    name="text"
                    placeholder="Escriba su postulado..."
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button disabled={pending} type="submit">{pending ? "Enviando..." : "Enviar"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg">Postulaciones</CardTitle>
          <p className="text-sm text-muted-foreground">
            {director.nominationsCreated.length} registradas
          </p>
        </CardHeader>

        <CardContent>
          {director.nominationsCreated.length === 0 ? (
            <div className="rounded-lg border p-6 text-sm text-muted-foreground">
              Todavía no hay postulaciones para este director.
            </div>
          ) : (
            <ScrollArea className="h-130 pr-3">
              <div className="space-y-3">
                {director.nominationsCreated.map((n) => (
                  <div key={n.id} className="rounded-lg border p-4">
                    <div className="whitespace-pre-wrap text-sm leading-6">{n.text}</div>
                    <Separator className="my-3" />
                    <div className="text-xs text-muted-foreground">
                      {n.createdAtLabel}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
