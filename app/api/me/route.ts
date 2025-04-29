import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const token = globalThis?.__NEXT_PRIVATE_PREVIEW_TOKEN__ || (await import("next/headers")).cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const user = await prisma.user.findUnique({
      where: { id: payload.id as string },
      select: { id: true, name: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ user: null });
  }
}
