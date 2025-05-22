import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const usuario = await prisma.user.findUnique({ where: { email } });

  if (!usuario) {
    return NextResponse.json({ error: "Correo no encontrado" }, { status: 404 });
  }

  const valido = await compare(password, usuario.password);

  if (!valido) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 403 });
  }

  const token = sign(
    { id: usuario.id, name: usuario.name, role: usuario.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const respuesta = NextResponse.json({
    mensaje: "Login exitoso",
    role: usuario.role,
  });

  respuesta.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return respuesta;
}
