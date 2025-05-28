import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PATCH(request: NextRequest, context: any) {
  const id = context.params.id;

  try {
    const body = await request.json();
    const estado = body.status;

    if (!estado || !["CONFIRMED", "CANCELLED"].includes(estado)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }

    const actualizada = await prisma.reservation.update({
      where: { id },
      data: { status: estado },
    });

    return NextResponse.json(actualizada);
  } catch (error) {
    console.error("Error al actualizar reserva:", error);
    return NextResponse.json(
      { error: "Error al actualizar la reserva" },
      { status: 500 }
    );
  }
}
