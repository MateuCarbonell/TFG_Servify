// /app/api/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const { id: userId } = verify(token, process.env.JWT_SECRET!) as { id: string };
    const { serviceId, rating, comment } = await req.json();

    if (!serviceId || !rating || rating < 1 || rating > 5 || !comment) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const nueva = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        serviceId,
      },
    });

    return NextResponse.json(nueva);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
