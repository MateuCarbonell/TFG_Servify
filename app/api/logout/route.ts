import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ mensaje: "Sesión cerrada" });

  response.cookies.set({
    name: "token",
    value: "",
    path: "/",
    httpOnly: true,
    maxAge: 0, // eliminar
  });

  return response;
}
