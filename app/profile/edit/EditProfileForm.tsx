"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type User = {
  id: string;
  name?: string;
  role: string;
};

export default function EditarPerfilForm({ user }: { user: User }) {
    
  const [name, setName] = useState(user.name || "");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/user/update", {
      method: "PATCH",
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setMensaje("Nombre actualizado correctamente.");
    } else {
      setMensaje("Error al actualizar.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Editar Perfil</h1>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Button type="submit">Guardar</Button>
      {mensaje && <p className="text-sm mt-2">{mensaje}</p>}
    </form>
  );
}
