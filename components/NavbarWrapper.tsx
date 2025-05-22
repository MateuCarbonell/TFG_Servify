// components/NavbarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login" || pathname === "/register";

  if (hideNavbar) {
    return null; // No mostrar nada en login y register
  }

  return <Navbar />;
}
