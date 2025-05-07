import { getUserFromCookie } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AccionesReserva } from "@/components/AccionesReserva"; // 👈 Import aquí

export default async function ReservasProveedorPage() {
  const user = await getUserFromCookie();

  if (!user || user.role !== "PROVEEDOR") {
    redirect("/login");
  }

  const reservas = await prisma.reservation.findMany({
    where: {
      service: {
        providerId: user.id,
      },
    },
    include: {
      client: { select: { name: true } },
      service: { select: { title: true } },
    },
    orderBy: {
      reservationDate: "desc",
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Reservas recibidas</h1>

      {reservas.length === 0 ? (
        <p className="text-muted-foreground">Aún no tienes reservas.</p>
      ) : (
        <ul className="space-y-4">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="border p-4 rounded-lg shadow">
              <h2 className="font-semibold">{reserva.service.title}</h2>
              <p className="text-sm text-gray-500">
                Cliente: {reserva.client.name}
              </p>
              <p className="text-sm">
                Fecha: {new Date(reserva.reservationDate).toLocaleString()}
              </p>
              <p className="text-sm">
                Estado:{" "}
                <span className="font-semibold text-blue-600">
                  {reserva.status}
                </span>
              </p>

              {reserva.status === "PENDING" && (
                <AccionesReserva id={reserva.id} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
