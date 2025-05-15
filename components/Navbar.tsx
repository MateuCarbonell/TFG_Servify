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

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; role: string; name?: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("No se pudo obtener el usuario", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  };
  console.log("User object:", user);


  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-between p-4 border-b bg-white shadow-md"
    >
      <div>
        <Logo />
      </div>

      <div className="flex items-center gap-4">
        {/* Botón para CLIENTE */}
        {user?.role === "CLIENTE" && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" onClick={() => router.push("/buscar")}>
              Buscar Servicios
            </Button>
          </motion.div>
        )}

        {/* Botón para PROVEEDOR */}
        {user?.role === "PROVEEDOR" && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" onClick={() => router.push("/provider/services")}>
              Gestionar Servicios
            </Button>
          </motion.div>
        )}

        {/* Botón de Settings (todos los roles) */}
        {user && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="default" onClick={() => router.push("/settings")}>
            Settings
          </Button>
        </motion.div>
        )}
        {/* Avatar dropdown */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="" alt="Avatar" />
                <AvatarFallback>{user.name?.charAt(0) ?? "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name || "Usuario"}</DropdownMenuLabel>
                            
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </motion.nav>
  );
}
