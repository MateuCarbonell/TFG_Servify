import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/servicios/:id
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_: NextRequest, context: any) {
  const id = context.params.id;

  const servicio = await prisma.service.findUnique({
    where: { id },
  });

  if (!servicio) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  return NextResponse.json(servicio);
}

// PATCH para editar un servicio
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PATCH(request: NextRequest, context: any) {
  const id = context.params.id;
  const { title, description, price, type } = await request.json();

  const servicioActualizado = await prisma.service.update({
    where: { id },
    data: {
      title,
      description,
      price: parseFloat(price),
      type,
    },
  });

  return NextResponse.json(servicioActualizado);
}

// DELETE /api/servicios/:id
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(_: NextRequest, context: any) {
  const id = context.params?.id;

  if (!id) {
    return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
  }

  try {
    await prisma.reservation.deleteMany({ where: { serviceId: id } });
    await prisma.service.delete({ where: { id } });

    return NextResponse.json({ mensaje: "Servicio eliminado" });
  } catch {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}
