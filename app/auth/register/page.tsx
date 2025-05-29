"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CLIENTE",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.name.length < 3)
      return setError("El nombre debe tener al menos 3 caracteres");
    if (!form.email.includes("@"))
      return setError("El email no es válido");
    if (form.password.length < 6)
      return setError("La contraseña debe tener al menos 6 caracteres");

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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-200 to-white px-4 text-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl p-8 bg-white/20 backdrop-blur-xl shadow-xl border border-white/10"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          Crear cuenta
        </h1>

        <div className="space-y-4">
          <Input
            name="name"
            placeholder="Nombre completo"
            onChange={handleChange}
            required
            className="bg-white/20 text-black placeholder-white border border-white/30"
          />
          <Input
            name="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
            required
            className="bg-white/20 text-black placeholder-white border border-white/30"
          />
          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            required
            className="bg-white/20 text-black placeholder-white border border-white/30"
          />
          <RadioGroup
  value={form.role}
  onValueChange={(v) => setForm({ ...form, role: v })}
  className="flex gap-4 text-white"
>
  <div className="flex items-center gap-2">
    <RadioGroupItem
      value="CLIENTE"
      id="cliente"
      className="border-white text-white data-[state=checked]:bg-white data-[state=checked]:border-white"
    />
    <label htmlFor="cliente" className="text-white">Cliente</label>
    
    <RadioGroupItem
      value="PROVEEDOR"
      id="proveedor"
      className="border-white text-white data-[state=checked]:bg-white data-[state=checked]:border-white"
    />
    <label htmlFor="proveedor" className="text-white">Proveedor</label>
      </div>
    </RadioGroup>

        </div>

        {error && (
          <p className="text-sm text-red-300 mt-3 text-center">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full mt-5 bg-white text-indigo-700 hover:bg-white/90 transition font-bold"
        >
          Crear cuenta
        </Button>

        <p className="text-sm text-center text-black/80 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-blue-200 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </main>
  );
}
