// /app/auth/register/page.tsx
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "CLIENTE" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.length < 3) {
      return setError("El nombre debe tener al menos 3 caracteres");
    }
    if (!form.email.includes("@")) {
      return setError("El email no es válido");
    }
    if (form.password.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres");
    }
    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      
      window.location.href = "/";
    } else {
      setError(data.error || "Error al registrarse");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-6 border rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center">Registrarse</h1>
        <Input name="name" placeholder="Nombre completo" onChange={handleChange} required />
        <Input name="email" placeholder="Correo electrónico" onChange={handleChange} required />
        <Input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <RadioGroup value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="CLIENTE" id="cliente" />
            <label htmlFor="cliente">Cliente</label>
            <RadioGroupItem value="PROVEEDOR" id="proveedor" />
            <label htmlFor="proveedor">Proveedor</label>
          </div>
        </RadioGroup>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full">Crear cuenta</Button>
      </form>
    </div>
  );
}