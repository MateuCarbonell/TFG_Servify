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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-200 to-white px-4 text-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl p-8 bg-white/20 backdrop-blur-xl shadow-xl border border-white/10"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Iniciar sesión
        </h1>

        <div className="space-y-4">
          <Input
            name="email"
            placeholder="Correo"
            onChange={handleChange}
            required
            className="bg-white/20 text-white placeholder-white border border-white/30"
          />
          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            required
            className="bg-white/20 text-white placeholder-white border border-white/30"
          />
        </div>

        {error && (
          <p className="text-sm text-red-300 mt-3 text-center">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full mt-5 bg-white text-indigo-700 hover:bg-white/90 transition font-bold"
        >
          Entrar
        </Button>

        <p className="text-sm text-center text-white/80 mt-4">
          ¿No tienes cuenta?{" "}
          <Link
            href="/auth/register"
            className="text-blue-200 hover:underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </form>
    </main>
  );
}
