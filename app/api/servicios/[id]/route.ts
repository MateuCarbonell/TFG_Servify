import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/servicios/:id
export async function GET(request: NextRequest, context: { params: { id: string } }) {
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
export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id;
  const { title, description, price } = await request.json();

  const servicioActualizado = await prisma.service.update({
    where: { id },
    data: {
      title,
      description,
      price: parseFloat(price),
    },
  });

  return NextResponse.json(servicioActualizado);
}

export async function DELETE(
  request: NextRequest,
  context: { params?: { id?: string } }
) {
  const id = context.params?.id;

  if (!id) {
    return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
  }

  try {
    await prisma.reservation.deleteMany({ where: { serviceId: id } });
    await prisma.service.delete({ where: { id } });

    return NextResponse.json({ mensaje: "Servicio eliminado" });
  } catch  {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}



