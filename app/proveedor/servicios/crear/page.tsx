// /app/proveedor/servicios/crear/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";


export default function CrearServicioPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", price: "",imageUrl: ""  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ Validaciones antes de enviar
  if (form.title.length < 3) {
    return toast.error("El título debe tener al menos 3 caracteres");
  }
  if (form.description.length < 10) {
    return toast.error("La descripción debe tener al menos 10 caracteres");
  }
  if (!form.price || Number(form.price) <= 0) {
    return toast.error("El precio debe ser mayor que 0");
  }

  // Enviar al backend
  const res = await fetch("/api/servicios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: form.title,
      description: form.description,
      price: parseFloat(form.price),
      imageUrl: form.imageUrl || null, // opcional
    }),
  });

  if (res.ok) {
    toast.success("Servicio creado correctamente");
    router.push("/proveedor/servicios");
  } else {
    toast.error("Error al crear el servicio");
  }
};

  return (
    
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 p-8 border rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center">Crear Nuevo Servicio</h2>

        <Input name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
        <Textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} required />
        <Input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} required />
        <Input
        name="imageUrl"
        placeholder="URL de imagen (opcional)"
        value={form.imageUrl}
        onChange={handleChange}
        />
        <Button type="submit" className="w-full">Crear Servicio</Button>
      </form>
    </div>
  );
}
