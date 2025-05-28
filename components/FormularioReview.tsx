// components/FormularioResena.tsx
"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function FormularioReview({ serviceId }: { serviceId: string }) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");

  const enviarReview = async () => {
    if (!comment || rating < 1 || rating > 5) {
      return toast.error("Puntuación entre 1 y 5 y comentario requerido");
    }

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ serviceId, rating, comment }),
    });

    if (res.ok) {
      toast.success("Reseña enviada");
      setRating(0);
      setComment("");
    } else {
      toast.error("Ya has enviado una reseña para este servicio");
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <Textarea
        placeholder="Escribe tu opinión..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Puntuación del 1 al 5"
        min={1}
        max={5}
        value={rating || ""}
        onChange={(e) => setRating(parseInt(e.target.value))}
      />
      <Button onClick={enviarReview}>Enviar reseña</Button>
    </div>
  );
}
