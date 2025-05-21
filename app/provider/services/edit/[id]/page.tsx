import { getUserFromCookie } from "@/lib/auth";
import prisma from "@/lib/prisma";
import EditarServicioForm from "./EditServiceForm";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUserFromCookie();

  if (!user || user.role !== "PROVEEDOR") {
    redirect("/");
  }

  const servicio = await prisma.service.findUnique({
    where: {
      id: params.id,
      providerId: user.id,
    },
  });

  if (!servicio) {
    redirect("/provider/services");
  }

  return <EditarServicioForm servicio={servicio} />;
}
