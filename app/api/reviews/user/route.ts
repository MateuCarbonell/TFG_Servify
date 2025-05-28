import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const usuario = verify(token, process.env.JWT_SECRET!) as { id: string };

    const reviews = await prisma.review.findMany({
      where: { userId: usuario.id },
      select: { serviceId: true }, // solo necesitamos esto
    });

    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
