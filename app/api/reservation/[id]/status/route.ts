import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").at(-2); // Extrae el `id` manualmente

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

  const reserva = await prisma.reservation.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ reserva });
}
