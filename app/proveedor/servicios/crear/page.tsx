// /app/proveedor/servicios/crear/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CrearServicioPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", price: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/servicios", {
      method: "POST",
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
      alert("Error al crear servicio");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 p-8 border rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center">Crear Nuevo Servicio</h2>

        <Input name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
        <Textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} required />
        <Input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} required />

        <Button type="submit" className="w-full">Crear Servicio</Button>
      </form>
    </div>
  );
}
