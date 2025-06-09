// /app/proveedor/servicios/editar/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
export default function EditarServicioPage() {
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState({ title: "", description: "", price: "", imageUrl: "", type: "", location: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/servicios/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title,
          description: data.description,
          price: data.price.toString(),
          imageUrl: data.imageUrl ?? "",
          type: data.type ,
          location: data.location || "", // Asegúrate de incluir location si es necesario
        });
        setLoading(false);
      });
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validaciones con toasts
    if (form.title.length < 3) {
      return toast.error("El título debe tener al menos 3 caracteres");
    }
    if (form.description.length < 10) {
      return toast.error("La descripción debe tener al menos 10 caracteres");
    }
    if (!form.price || Number(form.price) <= 0) {
      return toast.error("El precio debe ser mayor que 0");
    }

    const res = await fetch(`/api/servicios/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        imageUrl: form.imageUrl || null,
        type: form.type,
        location: form.location || "", 
      }),
    });

    if (res.ok) {
      toast.success("Servicio actualizado");
      router.push("/proveedor/servicios");
    } else {
      toast.error("Error al actualizar el servicio");
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 p-8 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/20"

      >
        <h2 className="text-2xl font-bold text-center">Editar Servicio</h2>

        <Input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
          className="bg-white text-black placeholder-gray-500 border border-gray-300"
        />
        <Textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          required
          className="bg-white text-black placeholder-gray-500 border border-gray-300"
        />
        <Input
          name="price"
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          required
          className="bg-white text-black placeholder-gray-500 border border-gray-300"/>
        
        <Input
          name="location"
          placeholder="Ubicación"
          value={form.location}
          onChange={handleChange}
          required
          className="bg-white text-black placeholder-gray-500 border border-gray-300"
        />

       <Select onValueChange={(value) => setForm({ ...form, type: value })}>
          <SelectTrigger className="w-full bg-white text-black placeholder-gray-500 border border-gray-300">
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Limpieza">Limpieza</SelectItem>
          <SelectItem value="Electricidad">Electricidad</SelectItem>
          <SelectItem value="Fontanería">Fontanería</SelectItem>
          <SelectItem value="Comida">Comida</SelectItem>
          <SelectItem value="Reformas">Reformas</SelectItem>
          <SelectItem value="Otros">Otros</SelectItem>
          </SelectContent>
        </Select>
      {/* <Input
          name="imageUrl"
          placeholder="URL de imagen (opcional)"
          value={form.imageUrl}
          onChange={handleChange}
        /> */}
        <Button type="submit" className="w-full">
          Guardar Cambios
        </Button>
      </form>
    </div>
  );
}
