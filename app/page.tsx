"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 space-y-10">
      {/* Título y descripción */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">Bienvenido a Servify</h1>
        <p className="text-muted-foreground max-w-xl">
          Encuentra profesionales o ofrece tus servicios en segundos. Servify conecta clientes con proveedores de confianza en toda España.
        </p>
      </motion.div>

      {/* Botones */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/login">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="default" size="lg">Iniciar sesión</Button>
          </motion.div>
        </Link>
        <Link href="/register">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="lg">Registrarse</Button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Tarjetas */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Cliente */}
        <motion.div
          whileHover={{ y: -8 }}
          className="border rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <Search className="h-8 w-8 text-primary mb-3" />
          <h3 className="text-lg font-semibold mb-1">¿Eres cliente?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Explora y reserva servicios fácilmente. Encuentra lo que necesitas filtrando por precio, tipo o ubicación.
          </p>
          <Link href="/buscar">
            <Button size="sm" variant="link">Buscar servicios</Button>
          </Link>
        </motion.div>

        {/* Proveedor */}
        <motion.div
          whileHover={{ y: -8 }}
          className="border rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <UserPlus className="h-8 w-8 text-primary mb-3" />
          <h3 className="text-lg font-semibold mb-1">¿Eres proveedor?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Crea tu perfil y publica tus servicios. Comienza a recibir solicitudes de clientes de inmediato.
          </p>
          <Link href="/register">
            <Button size="sm" variant="link">Crear cuenta</Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
