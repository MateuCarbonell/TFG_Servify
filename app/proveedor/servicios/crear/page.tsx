// /app/proveedor/servicios/crear/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



export default function CrearServicioPage() {
  const router = useRouter();
  const [form, setForm] = useState({
  title: "",
  description: "",
  price: "",
  imageUrl: "",
  type: "", 
  location: "", 
});

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
  if (!form.type) {
  return toast.error("Debes seleccionar un tipo de servicio");
}

  // Enviar al backend
  const res = await fetch("/api/servicios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...form,
        price: parseFloat(form.price)
    }),
  });

  if (res.ok) {
    toast.success("Servicio creado correctamente");
    console.log("Servicio creado:", form);
    router.push("/proveedor/servicios");
  } else {
    toast.error("Error al crear el servicio");
  }
};

  return (
    
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 p-8 border rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center">Crear Nuevo Servicio</h2>

        <Input name="title" placeholder="Título" value={form.title} onChange={handleChange} required className="bg-white text-black placeholder-gray-500 border border-gray-300" />
        <Textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} required className="bg-white text-black placeholder-gray-500 border border-gray-300" />
        <Input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} required  className="bg-white text-black placeholder-gray-500 border border-gray-300"/>
        <Input
        name="imageUrl"
        placeholder="URL de imagen (opcional)"
        value={form.imageUrl}
        onChange={handleChange}
        className="bg-white text-black placeholder-gray-500 border border-gray-300"
        />
        <label className="block text-sm font-medium">Tipo de servicio</label>
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
        <Input name="location" placeholder="Ubicación" value={form.location} onChange={handleChange} className="w-full bg-white text-black placeholder-gray-500 border border-gray-300" required />


        <Button type="submit" className="w-full">Crear Servicio</Button>
      </form>
    </div>
  );
}
