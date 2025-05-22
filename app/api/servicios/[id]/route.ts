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

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id;
 // Con esto se eliminan las reservas asociadas al servicio
  // y luego se elimina el servicio
  try {
    // 🔸 Eliminar primero las reservas asociadas
    await prisma.reservation.deleteMany({
      where: { serviceId: id },
    });

    // 🔸 Luego eliminar el servicio
    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ mensaje: "Servicio y reservas eliminados correctamente" });
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    return NextResponse.json({ error: "No se pudo eliminar el servicio" }, { status: 500 });
  }
}
