import { getUserFromCookie } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ServiciosPage() {
  const user = await getUserFromCookie();

  if (!user || user.role !== "PROVEEDOR") {
    redirect("/login");
  }

  const servicios = await prisma.service.findMany({
    where: { providerId: user.id },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis servicios</h1>
        <Link href="/provider/services/create">
          <Button>+ Crear servicio</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {servicios.length === 0 ? (
          <p>No has creado servicios todavía.</p>
        ) : (
          servicios.map((servicio) => (
            <div key={servicio.id} className="border rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold">{servicio.title}</h2>
              <p className="text-muted-foreground">{servicio.description}</p>
              <p className="mt-2 font-medium">Precio: ${servicio.price}</p>
              <p className="text-sm text-gray-500 mt-1">Tipo: {servicio.type}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
