

// /app/auth/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      if (data.role === "CLIENTE") router.push("/cliente/buscar");
      else router.push("/proveedor/servicios");
    } else {
      setError(data.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-6 border rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>
        <Input name="email" placeholder="Correo" onChange={handleChange} required />
        <Input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full">Entrar</Button>
      </form>
    </div>
  );
}