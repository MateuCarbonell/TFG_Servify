"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export function ReservarServicio({ servicio }: { servicio: any }) {
  const [open, setOpen] = useState(false);
  const [fecha, setFecha] = useState("");
  const [horas, setHoras] = useState<string[]>([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");

  const cargarHoras = async (nuevaFecha: string) => {
    setFecha(nuevaFecha);
    const res = await fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: servicio.id,
        fecha: nuevaFecha,
      }),
    });

    const data = await res.json();
    setHoras(data.horasDisponibles);
  };

  const reservar = async () => {
    if (!horaSeleccionada || !fecha) return alert("Selecciona una hora");
    const fechaCompleta = `${fecha}T${horaSeleccionada}:00`;

    const res = await fetch("/api/reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: servicio.id,
        fecha: fechaCompleta,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Reserva creada");
      setOpen(false);
    } else {
      alert(data.error || "Error al reservar");
    }
  };
  console.log("Horas disponibles cargadas:", horas);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Reservar</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seleccionar horario</DialogTitle>
        </DialogHeader>

        <input
          type="date"
          className="border px-3 py-1 rounded w-full mb-3"
          onChange={(e) => cargarHoras(e.target.value)}
        />

        <Select onValueChange={setHoraSeleccionada}>
          <SelectTrigger>
            <SelectValue placeholder="Elige una hora" />
          </SelectTrigger>
          <SelectContent>
            {horas.map((hora) => (
              <SelectItem key={hora} value={hora}>
                {hora}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button onClick={reservar}>Confirmar reserva</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
