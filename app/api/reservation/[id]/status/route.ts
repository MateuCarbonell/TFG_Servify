import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").at(-2); // Extrae el ID manualmente

  if (!id) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const user = await getUserFromCookie();

  if (!user || user.role !== "PROVEEDOR") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { status } = await request.json();

  if (!["PENDING", "CONFIRMED", "CANCELLED"].includes(status)) {
    return NextResponse.json({ error: "Estado no válido" }, { status: 400 });
  }

  if (status === "CONFIRMED") {
    const reservaActual = await prisma.reservation.findUnique({ where: { id } });

    if (!reservaActual) {
      return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
    }

    // Verifica que no haya otra reserva confirmada en esa misma hora y servicio
    const conflicto = await prisma.reservation.findFirst({
      where: {
        serviceId: reservaActual.serviceId,
        reservationDate: reservaActual.reservationDate,
        status: "CONFIRMED",
      },
    });

    if (conflicto) {
      return NextResponse.json({
        error: "Esa hora ya ha sido confirmada por otra reserva.",
      }, { status: 409 });
    }
  }

  const reserva = await prisma.reservation.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ reserva });
}
