import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getUserFromCookie() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return payload as { id: string; role: string; name?: string };
  } catch (error) {
    console.error("Error verifying token", error);
    return null;
  }
}
