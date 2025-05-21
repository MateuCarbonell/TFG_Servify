import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").at(-1); // <- Aquí se toma el último segmento (el [id])

  if (!id) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "PROVEEDOR") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { title, description, price, type } = await request.json();

    const servicio = await prisma.service.update({
      where: {
        id,
        providerId: user.id,
      },
      data: {
        title,
        description,
        price: parseFloat(price),
        type,
      },
    });

    return NextResponse.json(servicio);
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").at(-1);

  if (!id) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "PROVEEDOR") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await prisma.service.delete({
      where: {
        id,
        providerId: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
