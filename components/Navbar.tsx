"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
    setUser(null); // 👈 Muy importante: limpiar el usuario en React
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold">Mi Proyecto</div>

      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Dashboard
        </Button>

        <Button variant="default" onClick={() => router.push("/settings")}>
          Settings
        </Button>

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
