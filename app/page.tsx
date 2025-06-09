"use client";

import CSSParticlesBackground from "@/components/CSSParticlesBackground";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react"; // puedes usar cualquier ícono

type User = {
  id: string;
  role: "CLIENTE" | "PROVEEDOR";
  name?: string;
};

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      const res = await fetch("/api/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };
    cargarUsuario();
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#726ADE] text-white">
      <CSSParticlesBackground />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-xl w-full shadow-2xl"
        >
          <div className="flex justify-center mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            Bienvenido a Servify
          </motion.h1>

          <p className="text-md mb-6">
            Encuentra profesionales o ofrece tus servicios fácilmente.
          </p>

          <ul className="text-sm mb-6 space-y-1 opacity-90">
            <li>✔ Publica y encuentra servicios cerca de ti</li>
            <li>✔ Lee valoraciones reales de otros usuarios</li>
            <li>✔ Gestiona tus reservas desde tu panel</li>
          </ul>

          {!user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <Link
                href="/auth/login"
                className="px-5 py-2 rounded-md bg-white text-black font-medium shadow hover:bg-gray-200 transition"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/auth/register"
                className="px-5 py-2 rounded-md bg-indigo-500 text-white font-medium shadow hover:bg-indigo-600 transition"
              >
                Registrarse
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
