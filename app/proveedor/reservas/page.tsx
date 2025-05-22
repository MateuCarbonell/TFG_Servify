/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/proveedor/reservas/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ReservasProveedorPage() {
  const [reservas, setReservas] = useState<any[]>([]);

  const cargarReservas = async () => {
    const res = await fetch("/api/reservas", { credentials: "include" });
    const data = await res.json();
    setReservas(data.reservas);
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const actualizarEstado = async (id: string, estado: "CONFIRMED" | "CANCELLED") => {
    console.log("Actualizando reserva", id, estado);

    const res = await fetch(`/api/reservas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: estado }),
      credentials: "include",
    });

    const resultado = await res.json();
    console.log("Resultado:", resultado);

    if (res.ok) {
      await cargarReservas();
    } else {
      alert("Error: " + resultado.error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Reservas recibidas</h1>
      {reservas.length === 0 ? (
        <p className="text-muted-foreground">Aún no tienes reservas.</p>
      ) : (
        <ul className="space-y-4">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="border p-4 rounded-lg shadow">
              <h2 className="font-semibold">{reserva.service.title}</h2>
              <p className="text-sm">Cliente: {reserva.client.name}</p>
              <p className="text-sm text-gray-500">
                Fecha: {new Date(reserva.reservationDate).toLocaleString()}
              </p>
              <p className="text-sm font-semibold text-blue-600">{reserva.status}</p>
              {reserva.status === "PENDING" && (
                <div className="mt-2 flex gap-2">
                  <Button onClick={() => actualizarEstado(reserva.id, "CONFIRMED")}>
                    Confirmar
                  </Button>
                  <Button variant="destructive" onClick={() => actualizarEstado(reserva.id, "CANCELLED")}> 
                    Cancelar
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
