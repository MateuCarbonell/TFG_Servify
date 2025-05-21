import { getUserFromCookie } from "@/lib/auth";
import prisma from "@/lib/prisma";
import EditarServicioForm from "./EditServiceForm";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const user = await getUserFromCookie();
  if (!user || user.role !== "PROVEEDOR") {
    return null;
  }

  const servicio = await prisma.service.findUnique({
    where: {
      id: params.id,
      providerId: user.id,
    },
  });

  if (!servicio) return null;

  return <EditarServicioForm servicio={servicio} />;
}
