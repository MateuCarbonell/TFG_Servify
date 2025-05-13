import { getUserFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import CrearServicioForm from "./CreateServiceForm";

export default async function Page({}) {
  const user = await getUserFromCookie();
  if (!user || user.role !== "PROVEEDOR") {
    redirect("/");
  }

  return <CrearServicioForm/>;
}
