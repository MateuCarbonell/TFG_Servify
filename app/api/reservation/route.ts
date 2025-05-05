import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookie();

  if (!user || user.role !== "CLIENTE") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { serviceId } = await req.json();

  if (!serviceId) {
    return NextResponse.json({ error: "Falta serviceId" }, { status: 400 });
  }

  const reserva = await prisma.reservation.create({
    data: {
      serviceId,
      clientId: user.id,
      reservationDate: new Date(), // por ahora fecha actual
      status: "PENDING",
    },
  });

  return NextResponse.json({ reserva });
}
