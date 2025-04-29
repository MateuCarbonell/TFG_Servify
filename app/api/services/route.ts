import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

// CREAR servicio (solo proveedores)
export async function POST(request: Request) {
  const user = await getUserFromCookie();

  if (!user || user.role !== "PROVEEDOR") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { title, description, price } = await request.json();

  if (!title || !description || !price) {
    return NextResponse.json({ error: "Campos requeridos" }, { status: 400 });
  }

  const servicio = await prisma.service.create({
    data: {
      title,
      description,
      price,
      location: "Local", // temporal
      type: "General",    // temporal
      availability: {},   // temporal
      providerId: user.id,
    },
  });

  return NextResponse.json(servicio);
}

// OBTENER todos los servicios (clientes)
export async function GET() {
  const servicios = await prisma.service.findMany({
    include: {
      provider: {
        select: { name: true },
      },
    },
  });

  return NextResponse.json({ servicios });
}
