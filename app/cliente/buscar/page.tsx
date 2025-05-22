// /app/cliente/buscar/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Tipo simplificado del servicio
type Servicio = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export default function BuscarServiciosPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [fechas, setFechas] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    fetch("/api/servicios")
      .then(res => res.json())
      .then(data => setServicios(Array.isArray(data) ? data : data.servicios));
  }, []);

  const reservar = async (servicioId: string) => {
    const fecha = fechas[servicioId];
    if (!fecha) return alert("Selecciona una fecha");

    const res = await fetch("/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId: servicioId, reservationDate: fecha }),
      credentials: "include"

    });

    if (res.ok) alert("Reserva hecha correctamente");
    else alert("Error al reservar");
  };

  const serviciosFiltrados = servicios.filter(s =>
    s.title.toLowerCase().includes(filtroTitulo.toLowerCase()) &&
    (!precioMax || s.price <= parseFloat(precioMax))
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Buscar Servicios</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Filtrar por título"
          value={filtroTitulo}
          onChange={(e) => setFiltroTitulo(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Precio máximo"
          value={precioMax}
          onChange={(e) => setPrecioMax(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {serviciosFiltrados.length === 0 ? (
          <p>No hay servicios que coincidan con tu búsqueda.</p>
        ) : (
          serviciosFiltrados.map(servicio => (
            <Card key={servicio.id}>
              <CardHeader>
                <CardTitle>{servicio.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{servicio.description}</p>
                <p className="font-semibold">Precio: {servicio.price} €</p>

                <div className="mt-4 space-y-2">
                  <Input
                    type="datetime-local"
                    value={fechas[servicio.id] || ""}
                    onChange={(e) =>
                      setFechas({ ...fechas, [servicio.id]: e.target.value })
                    }
                  />
                  <Button onClick={() => reservar(servicio.id)}>Reservar</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
