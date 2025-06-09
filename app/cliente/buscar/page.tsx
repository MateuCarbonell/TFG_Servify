"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import FechaHoraPicker from "@/components/FechaHoraPicker";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


// Tipo simplificado del servicio
type Servicio = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string; // General, Fontanería, Electricidad, etc.
  image?: string; // URL de la imagen del servicio
};

export default function BuscarServiciosPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [fechas, setFechas] = useState<{ [id: string]: Date | null }>({});
  const [tipo, setTipo] = useState("todos");


  useEffect(() => {
    fetch("/api/servicios")
      .then(res => res.json())
      .then(data => setServicios(Array.isArray(data) ? data : data.servicios));
  }, []);

  const reservar = async (servicioId: string) => {
    const fecha = fechas[servicioId];
    if (!fecha) return toast.error("Selecciona una fecha");

    const ahora = new Date();
    if (fecha < ahora) {
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

  const serviciosFiltrados = servicios.filter(s =>
  s.title.toLowerCase().includes(filtroTitulo.toLowerCase()) &&
  (!precioMax || s.price <= parseFloat(precioMax)) &&
  (tipo === "todos" || s.type === tipo)
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
        <Select onValueChange={setTipo}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="Limpieza">Limpieza</SelectItem>
          <SelectItem value="Electricidad">Electricidad</SelectItem>
          <SelectItem value="Fontanería">Fontanería</SelectItem>
          <SelectItem value="Comida">Comida</SelectItem>
          <SelectItem value="Reformas">Reformas</SelectItem>
          <SelectItem value="Otros">Otros</SelectItem>
            <SelectItem value="General">Otros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {serviciosFiltrados.length === 0 ? (
          <p>No hay servicios que coincidan con tu búsqueda.</p>
        ) : (
          serviciosFiltrados.map((servicio) => (
  <Card
    key={servicio.id}
    className="bg-white/30 backdrop-blur-md text-black shadow-lg rounded-xl border border-white/50 p-5 hover:shadow-2xl transition"
  >
    <CardHeader className="p-0 mb-3">
      <CardTitle className="text-xl font-bold">{servicio.title}</CardTitle>
    </CardHeader>

    <CardContent className="p-0">
      <p className="text-sm text-black/80 mb-2 line-clamp-2">{servicio.description}</p>

      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-base">💶 {servicio.price} €</p>
        <span className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-full shadow">
          {servicio.type}
        </span>
      </div>

      <div className="space-y-2 mt-4">
        
        <FechaHoraPicker
          value={fechas[servicio.id] || null}
          onChange={(date) => setFechas({ ...fechas, [servicio.id]: date })}
          
        />

        <Button
          onClick={() => reservar(servicio.id)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
        >
          Reservar
        </Button>

        <Link href={`/cliente/servicios/${servicio.id}`}>
          <Button
            variant="outline"
            className="w-full text-indigo-600 border-indigo-500 hover:bg-indigo-100 mt-1"
          >
            Ver Reseñas
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
))
)}
      </div>
    </div>
  );
}
