import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import prisma from "@/lib/prisma";

// Crear una reserva (solo cliente)
export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const usuario = verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
    if (usuario.role !== "CLIENTE") {
      return NextResponse.json({ error: "Solo los clientes pueden reservar" }, { status: 403 });
    }

    const { serviceId, reservationDate } = await req.json();
    if (!serviceId || !reservationDate) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    //Validar que no haya otra reserva confirmada a esa hora
    const yaReservada = await prisma.reservation.findFirst({
      where: {
        serviceId,
        reservationDate: new Date(reservationDate),
        status: "CONFIRMED",
      },
    });

    if (yaReservada) {
      return NextResponse.json(
        { error: "Esa hora ya ha sido reservada por otro cliente." },
        { status: 409 }
      );
    }

    const reserva = await prisma.reservation.create({
      data: {
        serviceId,
        reservationDate: new Date(reservationDate),
        clientId: usuario.id,
      },
    });

    return NextResponse.json({ reserva });
  } catch {
    return NextResponse.json({ error: "Token inválido o error interno" }, { status: 401 });
  }
}


// Obtener reservas del cliente o proveedor
export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const usuario = verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
    let reservas;

    if (usuario.role === "CLIENTE") {
      reservas = await prisma.reservation.findMany({
        where: { clientId: usuario.id },
        include: {
          service: {
            select: {
              title: true,
              type: true,
              price: true,
              provider: { select: { name: true } },
            },
          },
        },
      });
    } else {
      reservas = await prisma.reservation.findMany({
        where: { service: { providerId: usuario.id } },
        include: {
          client: { select: { name: true, email: true } },
          service: {
            include: {
              provider: { select: { name: true } },
            },
          },
        },
      });
    }

    return NextResponse.json({ reservas });
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
