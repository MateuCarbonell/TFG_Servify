"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditarPerfilPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => setName(data.name || ""));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/user/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      toast.success("Nombre actualizado");
      router.push("/perfil");
    } else {
      toast.error("Error al actualizar");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Nuevo nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">Guardar cambios</Button>
      </form>
    </div>
  );
}
