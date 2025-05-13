import { getUserFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ServiciosProveedor from "./ProviderService";

export default async function Page() {
  const user = await getUserFromCookie();

  if (!user || user.role !== "PROVEEDOR") redirect("/");

  const servicios = await prisma.service.findMany({
    where: { providerId: user.id },
  });

  return <ServiciosProveedor servicios={servicios} />;
}
