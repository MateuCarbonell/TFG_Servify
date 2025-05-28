

// /app/auth/login/page.tsx
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function LoginPage() {
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
      window.location.href = "/";
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
        {/* Añadir link navegacion para ir al registro */}
        <p className="text-sm text-center">
          ¿No tienes cuenta? <Link href="/auth/register" className="text-blue-500 hover:underline">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
}