"use client";
// app/buscar/BuscarPageClient.tsx
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReservarServicio } from "@/components/ReservarServicio";
import { Skeleton } from "@/components/ui/skeleton";

type Servicio = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  provider?: {
    name: string;
  };
};

async function fetchServicios() {
  const res = await fetch("/api/services");
  return res.json();
}

export default function BuscarPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  useEffect(() => {
    const cargarServicios = async () => {
      setLoading(true);
      const data = await fetchServicios();
      setServicios(data.servicios);
      setLoading(false);
    };

    cargarServicios();
  }, []);

  const serviciosFiltrados = servicios.filter((servicio) => {
    const tituloCoincide = servicio.title.toLowerCase().includes(filtroTitulo.toLowerCase());
    const precioCoincide =
      (!precioMin || servicio.price >= parseFloat(precioMin)) &&
      (!precioMax || servicio.price <= parseFloat(precioMax));
    const tipoCoincide =
      tipoSeleccionado === "" || tipoSeleccionado === "todos" || servicio.type === tipoSeleccionado;
    return tituloCoincide && precioCoincide && tipoCoincide;
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Buscar Servicios</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Buscar por título"
          value={filtroTitulo}
          onChange={(e) => setFiltroTitulo(e.target.value)}
          className="w-full md:w-1/4"
        />
        <Input
          placeholder="Precio mínimo"
          type="number"
          value={precioMin}
          onChange={(e) => setPrecioMin(e.target.value)}
          className="w-full md:w-1/6"
        />
        <Input
          placeholder="Precio máximo"
          type="number"
          value={precioMax}
          onChange={(e) => setPrecioMax(e.target.value)}
          className="w-full md:w-1/6"
        />

        <Select onValueChange={setTipoSeleccionado}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Tipo de servicio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="General">General</SelectItem>
            <SelectItem value="Fontanería">Fontanería</SelectItem>
            <SelectItem value="Peluquería">Peluquería</SelectItem>
            <SelectItem value="Electricidad">Electricidad</SelectItem>
            {/* Puedes agregar más tipos */}
          </SelectContent>
        </Select>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? [...Array(6)].map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)
          : serviciosFiltrados.length === 0
          ? <p className="text-muted-foreground col-span-full">No hay servicios que coincidan con tu búsqueda.</p>
          : serviciosFiltrados.map((servicio) => (
              <Card key={servicio.id} className="hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle>{servicio.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{servicio.description}</p>
                  <p className="font-semibold">Precio: ${servicio.price}</p>
                  <p className="text-sm text-gray-500 mt-2">Tipo: {servicio.type}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Ofrecido por: {servicio.provider?.name || "Proveedor"}
                  </p>
                  {/* Botón reservar */}
                  <div className="mt-4">
                    <ReservarServicio servicio={servicio} />
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
