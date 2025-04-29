import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth"; // Asegúrate de tener tu verificador de JWT

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const user = await verifyToken(token);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error obteniendo el usuario:", error);
    return NextResponse.json({ user: null });
  }
}
