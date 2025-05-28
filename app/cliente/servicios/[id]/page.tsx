/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/cliente/servicios/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reviews } from "@/components/Reviews";

export default function DetalleServicioPage() {
  const { id } = useParams();
  const [servicio, setServicio] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/servicios/${id}`)
      .then((res) => res.json())
      .then((data) => setServicio(data));
  }, [id]);

  if (!servicio) return <p className="p-6">Cargando...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{servicio.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{servicio.description}</p>
          <p className="font-semibold mt-2">Precio: {servicio.price} €</p>
        </CardContent>
      </Card>

      <Reviews serviceId={id as string} />
    </div>
  );
}
