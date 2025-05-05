// Horas libres

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Horas posibles por defecto (puedes ajustar)
const HORAS_POSIBLES = [
  "09:00", "10:00", "11:00", "12:00",
  "16:00", "17:00", "18:00", "19:00",
];

export async function POST(req: NextRequest) {
  const { serviceId, fecha } = await req.json();

  if (!serviceId || !fecha) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const fechaInicio = new Date(`${fecha}T00:00:00`);
  const fechaFin = new Date(`${fecha}T23:59:59`);

  // Obtener reservas para ese día y servicio
  const reservas = await prisma.reservation.findMany({
    where: {
      serviceId,
      reservationDate: {
        gte: fechaInicio,
        lte: fechaFin,
      },
    },
  });
  

  // Extraer solo la hora de cada reserva ocupada
  const horasOcupadas = reservas.map((r) =>
    new Date(r.reservationDate).toTimeString().substring(0, 5)
  );

  // Filtrar horas disponibles
  const horasDisponibles = HORAS_POSIBLES.filter(
    (hora) => !horasOcupadas.includes(hora)
  );
  console.log("🟢 serviceId:", serviceId);
  console.log("📅 fecha:", fecha);
  console.log("🕒 reservas encontradas:", reservas.length);
  console.log("⛔ horas ocupadas:", horasOcupadas);
  console.log("✅ horas disponibles:", horasDisponibles);
  return NextResponse.json({ horasDisponibles });
}
