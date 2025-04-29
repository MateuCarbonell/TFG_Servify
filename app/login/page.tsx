"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // 👈 Importamos Link para navegación interna

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

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
      if (data.role === "CLIENTE") {
        router.push("/buscar");
      } else {
        router.push("/provider/services");
      }
    } else {
      alert(data.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 p-8 border rounded-xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>

        <Input
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Button type="submit" className="w-full">
          Entrar
        </Button>

        {/* Footer pequeño */}
        <div className="text-center text-sm mt-4">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="underline text-primary">
            Regístrate aquí
          </Link>
        </div>
      </form>
    </div>
  );
}
