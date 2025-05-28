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

  try {
    const usuario = verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
    if (usuario.role !== "PROVEEDOR") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const { title, description, price, imageUrl } = await req.json();

    // Validaciones back
    if (!title || title.length < 3) {
      return NextResponse.json({ error: "Título demasiado corto" }, { status: 400 });
    }
    if (!description || description.length < 10) {
      return NextResponse.json({ error: "Descripción demasiado corta" }, { status: 400 });
    }
    if (!price || typeof price !== "number" || price <= 0) {
      return NextResponse.json({ error: "Precio inválido" }, { status: 400 });
    }

    const servicio = await prisma.service.create({
      data: {
        title,
        description,
        price,
        imageUrl: imageUrl || null,
        providerId: usuario.id,
        location: "",
        type: "General",
        availability: {},
      },
    });

    return NextResponse.json(servicio);
  } catch (error) {
    console.error("❌ Error al crear servicio:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

