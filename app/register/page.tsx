"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "CLIENTE" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setForm({ ...form, role: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
    if (!form.name || !form.email || !form.password || !form.role) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("El correo no tiene un formato válido.");
      console.log("Email no válido:", form.email);
      return;
    }

    if (form.password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    setError(""); // Limpia errores anteriores

    const res = await fetch("/api/register", {
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
      setError(data.error || "Error al registrarse");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 p-8 border rounded-xl shadow-lg bg-white"
      >
        <h1 className="text-2xl font-bold text-center">Crear cuenta</h1>

        <Input
          name="name"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />

        <RadioGroup value={form.role} onValueChange={handleRoleChange}>
          <RadioGroupItem value="CLIENTE" id="cliente" />
          <label htmlFor="cliente" className="ml-2">Cliente</label>
          <RadioGroupItem value="PROVEEDOR" id="proveedor" />
          <label htmlFor="proveedor" className="ml-2">Proveedor</label>
        </RadioGroup>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full">
          Registrarse
        </Button>

        <div className="text-center text-sm mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="underline text-primary">
            Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
}
