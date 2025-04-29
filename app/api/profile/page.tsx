import { getUserFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PerfilPage() {
  const user = await getUserFromCookie();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>

      <div className="space-y-4">
        <div>
          <strong>ID:</strong> {user.id}
        </div>
        <div>
          <strong>Rol:</strong> {user.role}
        </div>
        {/* Podrías añadir más datos si tienes nombre, email, etc. */}
      </div>
    </div>
  );
}
