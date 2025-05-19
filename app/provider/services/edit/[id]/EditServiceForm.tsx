"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
export default function EditarServicioForm({ servicio }: { servicio: Servicio }) {
  const [form, setForm] = useState({
    title: servicio.title,
    description: servicio.description,
    price: servicio.price,
    type: servicio.type,
  });

  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/services/${servicio.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMensaje("Servicio actualizado.");
      router.push("/provider/services");
    } else {
      setMensaje("Error al actualizar el servicio.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Editar Servicio</h1>
      <Input name="title" value={form.title} onChange={handleChange} placeholder="Título" />
      <Input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" />
      <Input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Precio" />
      <Input name="type" value={form.type} onChange={handleChange} placeholder="Tipo" />
      <Button type="submit">Guardar cambios</Button>
      {mensaje && <p className="text-sm mt-2">{mensaje}</p>}
    </form>
  );
}
