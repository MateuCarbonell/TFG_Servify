import { jwtVerify } from "jose";
import { cookies } from "next/headers";

// Verifica el token
export async function verifyToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const { payload } = await jwtVerify(token, secret);

  return payload as { id: string; role: string; name?: string; email?: string };
}

// Obtener usuario de la cookie 
export async function getUserFromCookie() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) return null;

  try {
    const user = await verifyToken(token);
    return user;
  } catch  {
    return null;
  }
}
