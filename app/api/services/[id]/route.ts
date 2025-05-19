import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromCookie();
    if (!user || user.role !== "PROVEEDOR") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { title, description, price, type } = await req.json();

    const servicio = await prisma.service.update({
      where: {
        id: params.id,
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

