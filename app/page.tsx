// /app/page.tsx (Landing)
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  type User = {
  id: string;
  role: "CLIENTE" | "PROVEEDOR";
  name?: string;
  };

  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const cargarUsuario = async () => {
      const res = await fetch("/api/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
          console.log("👤 Usuario recibido:", data); // 👈 VERÁS QUÉ LLEGA EN LA CONSOLA

        setUser(data);
      }
    };
    cargarUsuario();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-10">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a ServiFy</h1>
      <p className="text-muted-foreground mb-6">
        Encuentra profesionales o ofrece tus servicios fácilmente.
      </p>
      <div className="flex gap-4">
        {!user && (
          <>
            <Link href="/auth/login">Iniciar sesión</Link>
            <Link href="/auth/register">Registrarse</Link>
          </>
        )}
       
          
          {/* {user && ()}
          Aqui irá bastante parte del diseño, en el momento que esté logueado
          */}
        
      </div>
    </main>
  );
}