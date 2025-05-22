// /app/proveedor/servicios/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Tipo de servicio
interface Servicio {
  id: string;
  title: string;
  description: string;
  price: number;
}

export default function ServiciosProveedorPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);

  const cargar = () => {
    fetch("/api/servicios")
      .then(res => res.json())
      .then(data => setServicios(Array.isArray(data) ? data : data.servicios));
  };

  useEffect(() => {
    cargar();
  }, []);
  
  const eliminar = async (id: string) => {
    const ok = confirm("¿Eliminar servicio?");
    if (!ok) return;

    const res = await fetch(`/api/servicios/${id}`, { method: "DELETE" });
    if (res.ok) cargar();
    else alert("Error al eliminar");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis servicios</h1>
        <Link href="/proveedor/servicios/crear">
          <Button>+ Crear servicio</Button>
        </Link>
      </div>

      {servicios.length === 0 ? (
        <p className="text-muted-foreground">No has creado servicios todavía.</p>
      ) : (
        <div className="space-y-4">
          {servicios.map((s) => (
            <Card key={s.id}>
              <CardHeader>
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{s.description}</p>
                <p className="font-medium">Precio: {s.price} €</p>
                <div className="flex gap-2 mt-4">
                  <Link href={`/proveedor/servicios/editar/${s.id}`}>
                    <Button variant="outline">Editar</Button>
                  </Link>
                  <Button variant="destructive" onClick={() => eliminar(s.id)}>
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}