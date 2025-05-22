// app/profile/edit/page.tsx
import { getUserFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import EditarPerfilForm from "./EditProfileForm";

export default async function Page() {
  const user = await getUserFromCookie();

  if (!user) redirect("/");

  return <EditarPerfilForm user={user} />;
}
