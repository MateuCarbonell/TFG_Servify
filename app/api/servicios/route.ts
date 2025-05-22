import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import prisma from "@/lib/prisma";

// Listar todos los servicios
export async function GET() {
  const servicios = await prisma.service.findMany();
  return NextResponse.json(servicios);
}

// Crear un servicio (solo proveedor)
export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const usuario = verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
  if (usuario.role !== "PROVEEDOR") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { title, description, price } = await req.json();

  const servicio = await prisma.service.create({
    data: {
      title,
      description,
      price: parseFloat(price),
      providerId: usuario.id,
      location: "",
      type: "General",
      availability: {},
    },
  });

  return NextResponse.json(servicio);
}
