"use client";
// /app/proveedor/servicios/editar/[id]/page.tsx
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function EditarServicioPage() {
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState({ title: "", description: "", price: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/servicios/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title,
          description: data.description,
          price: data.price.toString(),
        });
        setLoading(false);
      });
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/servicios/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
      }),
    });

    if (res.ok) {
      router.push("/proveedor/servicios");
    } else {
      alert("Error al actualizar");
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 p-8 border rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center">Editar Servicio</h2>

        <Input name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
        <Textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} required />
        <Input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} required />

        <Button type="submit" className="w-full">Guardar Cambios</Button>
      </form>
    </div>
  );
}
