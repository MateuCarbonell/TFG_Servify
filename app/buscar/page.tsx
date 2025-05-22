// app/buscar/page.tsx
import { getUserFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import BuscarPageClient from "./BuscarPageClient";

export default async function BuscarPage() {
  const user = await getUserFromCookie();

  if (!user || user.role !== "CLIENTE") {
    redirect("/login");
  }

  return <BuscarPageClient />;
}
