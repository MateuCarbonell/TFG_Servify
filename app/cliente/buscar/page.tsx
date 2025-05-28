"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import FechaHoraPicker from "@/components/FechaHoraPicker";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Tipo simplificado del servicio
type Servicio = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  image?: string;
};

export default function BuscarServiciosPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [fechas, setFechas] = useState<{ [id: string]: Date | null }>({});
  const [tipo, setTipo] = useState("todos");

  useEffect(() => {
    fetch("/api/servicios")
      .then((res) => res.json())
      .then((data) => setServicios(Array.isArray(data) ? data : data.servicios));
  }, []);

  const reservar = async (servicioId: string) => {
    const fecha = fechas[servicioId];
    if (!fecha) return toast.error("Selecciona una fecha");

    if (fecha < new Date()) {
      return toast.error("No puedes reservar en una fecha pasada.");
    }

    const res = await fetch("/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: servicioId,
        reservationDate: fecha.toISOString(),
      }),
      credentials: "include",
    });

    if (res.ok) {
      toast.success("Reserva hecha correctamente");
    } else {
      toast.error("Error al reservar, fecha ya reservada");
    }
  };

  const serviciosFiltrados = servicios.filter(
    (s) =>
      s.title.toLowerCase().includes(filtroTitulo.toLowerCase()) &&
      (!precioMax || s.price <= parseFloat(precioMax)) &&
      (tipo === "todos" || s.type === tipo)
  );

  return (
    <main className="min-h-screen bg-[#e6e9f0] text-black px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Buscar Servicios</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <Input
            placeholder="Filtrar por título"
            value={filtroTitulo}
            onChange={(e) => setFiltroTitulo(e.target.value)}
            className="bg-white/20 text-black placeholder:text-black placeholder:opacity-100 border border-white/30"
          />

          <Input
            type="number"
            placeholder="Precio máximo"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
            className="bg-white/20 text-white placeholder:text-black placeholder:opacity-100 border border-white/30"
          />

          <Select onValueChange={setTipo}>
            <SelectTrigger className="bg-white/20 text-black placeholder:text-white placeholder:opacity-70 border border-white/30 ">
              <SelectValue placeholder="Filtrar por tipo" className="" />
            </SelectTrigger>
            <SelectContent className="text-black">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Fontanería">Fontanería</SelectItem>
              <SelectItem value="Electricidad">Electricidad</SelectItem>
              <SelectItem value="Peluquería">Peluquería</SelectItem>
              <SelectItem value="General">Otros</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviciosFiltrados.length === 0 ? (
            <p className="text-center opacity-80">No hay servicios que coincidan con tu búsqueda.</p>
          ) : (
            serviciosFiltrados.map((servicio) => (
              <Card
                key={servicio.id}
                className="bg-white/40 backdrop-blur-md text-black shadow-xl rounded-2xl border border-white/60"
              >
                <CardHeader>
                  <CardTitle>{servicio.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm opacity-90 mb-2">{servicio.description}</p>
                  <p className="font-semibold">Precio: {servicio.price} €</p>

                  <div className="mt-4 space-y-2">
                    <label className="text-sm font-medium text-black">
                      Selecciona fecha y hora:
                    </label>
                    <div className="relative flex items-center z-50">
                      <FechaHoraPicker
                        value={fechas[servicio.id] || null}
                        onChange={(date) =>
                          setFechas({ ...fechas, [servicio.id]: date })
                        }
                      />
                    </div>

                    <Button onClick={() => reservar(servicio.id)}>
                      Reservar
                    </Button>

                    <Link href={`/cliente/servicios/${servicio.id}`}>
                      <Button variant="outline" className="mt-4 bg-white/20 text-white hover:bg-white/30">
                        Reseñas
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
