import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ReservationStatus } from "@prisma/client";

import { getUserFromCookie } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUserFromCookie();
  const formData = await request.formData();
  const status = formData.get("status");

  if (!user || user.role !== "PROVEEDOR") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (
    !status ||
    !["PENDING", "CONFIRMED", "CANCELLED"].includes(String(status))
  ) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }

  await prisma.reservation.update({
    where: { id: params.id },
    data: { status: status as ReservationStatus }, 
  });

  return NextResponse.redirect(new URL("/provider/reservas", request.url));
}
