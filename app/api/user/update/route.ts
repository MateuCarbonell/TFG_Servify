import { getUserFromCookie } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { name } = await req.json();

  const actualizado = await prisma.user.update({
    where: { id: user.id },
    data: { name },
  });

  return NextResponse.json({ user: actualizado });
}
