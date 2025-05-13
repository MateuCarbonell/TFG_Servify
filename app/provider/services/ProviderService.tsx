"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Servicio = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
};

export default function ServiciosProveedor({ servicios }: { servicios: Servicio[] }) {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis servicios</h1>
        <Link href="/provider/services/create">
          <Button>+ Crear servicio</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {servicios.length === 0 ? (
          <p>No has creado servicios todavía.</p>
        ) : (
          servicios.map((servicio) => (
            <Card key={servicio.id}>
              <CardHeader>
                <CardTitle>{servicio.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{servicio.description}</p>
                <p className="mt-2 font-medium">Precio: ${servicio.price}</p>
                <p className="text-sm text-gray-500">Tipo: {servicio.type}</p>

                <div className="mt-4 flex gap-2">
                  <Link href={`/provider/services/edit/${servicio.id}`}>
                    <Button variant="outline">Editar</Button>
                  </Link>
                  <form action={`/api/services/${servicio.id}`} method="POST">
                    <input type="hidden" name="_method" value="DELETE" />
                    <Button type="submit" variant="destructive">
                      Eliminar
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
