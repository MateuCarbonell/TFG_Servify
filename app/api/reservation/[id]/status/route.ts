import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const user = await getUserFromCookie();

  if (!user || user.role !== "PROVEEDOR") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { status } = await req.json();
  const id = context.params.id;

  if (!["PENDING", "CONFIRMED", "CANCELLED"].includes(status)) {
    return NextResponse.json({ error: "Estado no válido" }, { status: 400 });
  }

  const reserva = await prisma.reservation.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ reserva });
}
