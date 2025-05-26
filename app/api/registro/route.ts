import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

// Registro de usuario
export async function POST(req: NextRequest) {
  const { name, email, password, role } = await req.json();

  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const existe = await prisma.user.findUnique({ where: { email } });
  if (existe) {
    return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashed, role },
  });

  const token = sign(
    { id: user.id, role: user.role, name: user.name },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const response = NextResponse.json({
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}
