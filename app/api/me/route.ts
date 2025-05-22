import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.json(null, { status: 200 });

  try {
    const usuario = verify(token, process.env.JWT_SECRET!) as {
      id: string;
      name?: string;
      role: string;
    };

    return NextResponse.json(usuario);
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
