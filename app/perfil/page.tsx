/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/perfil/page.tsx (cliente)
import { getUserFromCookie } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import FormularioReview from "@/components/FormularioReview";

export default async function PerfilClientePage() {
  const user = await getUserFromCookie();
  if (!user || user.role !== "CLIENTE") redirect("/login");

  const reservas = await prisma.reservation.findMany({
    where: { clientId: user.id },
    include: {
      service: {
        select: {
          title: true,
          location: true,
          provider: { select: { name: true } }
        }
      }
    },
    orderBy: { reservationDate: "desc" }
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mis reservas</h1>
      {reservas.length === 0 ? (
        <p className="text-muted-foreground">No tienes reservas todavía.</p>
      ) : (
        <ul className="space-y-4">
          
          {reservas.map((reserva: any) => (
            <li key={reserva.id} className="border p-4 rounded-lg shadow">
              <h2 className="font-semibold">{reserva.service.title}</h2>
              <p className="text-sm">Ubicación: {reserva.service.location}</p>
              <p className="text-sm">Proveedor: {reserva.service.provider.name}</p>
              <p className="text-sm text-gray-500">
                Fecha: {new Date(reserva.reservationDate).toLocaleString()}
              </p>
              <p className="text-sm font-semibold text-blue-600">{reserva.status}</p>
              {reserva.status === "CONFIRMED" && (
              <FormularioReview serviceId={reserva.serviceId} />
            )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
