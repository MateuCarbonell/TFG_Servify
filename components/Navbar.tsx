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

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; role: string; name?: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user); // 👈 Guardamos user con su rol
        }
      } catch (error) {
        console.error("No se pudo obtener el usuario", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null); // 👈 Limpiar usuario
    router.push("/"); // 👈 Volver al landing
    router.refresh();
  };

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold">Mi Proyecto</div>

      <div className="flex items-center gap-4">

        {/* Mostrar solo si está logueado */}
        {user?.role === "CLIENTE" && (
          <Button variant="outline" onClick={() => router.push("/buscar")}>
            Buscar Servicios
          </Button>
        )}

        {user?.role === "PROVEEDOR" && (
          <Button variant="outline" onClick={() => router.push("/provider/services")}>
            Gestionar Servicios
          </Button>
        )}

        <Button variant="default" onClick={() => router.push("/settings")}>
          Settings
        </Button>
          {/* ShadCN */}
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
    </nav>
  );
}
