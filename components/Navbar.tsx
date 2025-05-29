"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; role: string; name?: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user || data); // según cómo devuelvas el JSON
        }
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null); // refrescar pagina
    window.location.href = "/";;
    
  };
  const refreshUser = async () => {
  const res = await fetch("/api/me", { credentials: "include" });
  if (res.ok) {
    const data = await res.json();
    setUser(data.user || data);
  }
};

  if (!user) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="z-20 relative flex items-center justify-between p-4 border-b bg-white shadow-md"
    >
      <Logo />

      <div className="flex items-center gap-4">
        
      <Button variant="outline" onClick={() => router.push("/perfil/editar")}>
        Editar Perfil
        </Button>
        {user.role === "CLIENTE" && (
          <>
            <Button variant="outline" onClick={() => router.push("/cliente/buscar")}>
              Buscar Servicios
            </Button>
            <Button variant="outline" onClick={() => router.push("/perfil")}>
              Mis Reservas
            </Button>
          </>
        )}

        {user.role === "PROVEEDOR" && (
          <>
            <Button variant="outline" onClick={() => router.push("/proveedor/servicios")}>
              Mis Servicios
            </Button>
            <Button variant="outline" onClick={() => router.push("/proveedor/reservas")}>
              Reservas Recibidas
            </Button>
          </>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="" alt="Avatar" />
              <AvatarFallback>{user.name?.charAt(0).toUpperCase() ?? "U"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.name || "Usuario"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.nav>
  );
}
