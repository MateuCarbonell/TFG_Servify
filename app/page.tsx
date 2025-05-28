// /app/page.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";

// Carga dinámica del componente Spline
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

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
    <main className="relative h-screen w-full overflow-hidden">
      {/* Animación 3D */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/95uJI9Vk-qpD3t18/scene.splinecode" />
      </div>

      {/* Contenido sobre el fondo */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/20 backdrop-blur-md rounded-xl p-8 max-w-xl shadow-lg"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Bienvenido a ServiFy</h1>
          <p className="text-white text-md mb-6">
            Encuentra profesionales o ofrece tus servicios fácilmente.
          </p>

          {!user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <Link
                href="/auth/login"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-neutral-800 transition"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-100 transition"
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
