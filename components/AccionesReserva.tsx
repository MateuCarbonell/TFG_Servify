"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AccionesReserva({ id }: { id: string }) {
  const router = useRouter();

  const confirmar = async () => {
    await fetch(`/api/reservation/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "CONFIRMED" }),
    });

    router.push("/provider/reservation");
  };

  const cancelar = async () => {
    await fetch(`/api/reservation/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "CANCELLED" }),
    });

    router.push("/provider/reservation");
  };

  return (
    <div className="flex gap-2 mt-2">
      <Button onClick={confirmar} variant="default">Confirmar</Button>
      <Button onClick={cancelar} variant="destructive">Cancelar</Button>
    </div>
  );
}
