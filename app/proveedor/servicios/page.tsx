"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface Servicio {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  imageUrl?: string;
}

export default function ServiciosProveedorPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);

  const cargar = () => {
    fetch("/api/servicios")
      .then((res) => res.json())
      .then((data) => setServicios(Array.isArray(data) ? data : data.servicios));
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id: string) => {
    const ok = confirm("¿Eliminar servicio?");
    if (!ok) {
      toast.error("Eliminación cancelada");
      return;
    }
    const res = await fetch(`/api/servicios/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Servicio eliminado");
      cargar();
    } else {
      toast.error("Error al eliminar");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis servicios</h1>
        <Link href="/proveedor/servicios/crear">
          <Button>+ Crear servicio</Button>
        </Link>
      </div>

      {servicios.length === 0 ? (
        <p className="text-muted-foreground">No has creado servicios todavía.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicios.map((s) => (
            <Card
              key={s.id}
              className="relative overflow-visible bg-white/30 backdrop-blur-md text-black shadow-lg rounded-xl border border-white/50 p-5 hover:shadow-xl transition"

            >
              <CardTitle className="text-xl font-bold mb-3">{s.title}</CardTitle>

              <p className="text-sm text-black/80 mb-2 line-clamp-3">
                {s.description}
              </p>

              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-base">💶 {s.price} €</span>
                <span className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-full shadow">
                  {s.type}
                </span>
              </div>

              {/* === Botones con estilo consistente al ejemplo de "Reservar" === */}
              <div className="space-y-2 mt-4">
                <Link href={`/proveedor/servicios/editar/${s.id}`}>
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                  >
                    Editar
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  onClick={() => eliminar(s.id)}
                  className=" mt-2 w-full text-red-600 border-red-500 hover:bg-red-100 font-semibold"
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
