import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PATCH /api/reservas/:id → confirmar o cancelar una reserva
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { status } = await request.json();

  if (!["CONFIRMED", "CANCELLED"].includes(status)) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }

  const reserva = await prisma.reservation.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json(reserva);
}
