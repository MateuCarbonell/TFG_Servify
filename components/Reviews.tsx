// /components/Reviews.tsx
"use client";
import { useEffect, useState } from "react";

export function Reviews({ serviceId }: { serviceId: string }) {
  const [reviews, setReviews] = useState<{ rating: number; comment: string }[]>([]);

  useEffect(() => {
    fetch(`/api/servicios/${serviceId}/reviews`)
      .then(res => res.json())
      .then(data => setReviews(data.reviews));
  }, [serviceId]);

  return (
    <div className="mt-4 space-y-2">
      <h4 className="text-sm font-bold">Opiniones:</h4>
      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-sm">Aún no hay valoraciones.</p>
      ) : (
        reviews.map((r, i) => (
          <div key={i} className="border p-2 rounded">
            <p className="font-medium">⭐ {r.rating}/5</p>
            <p className="text-sm">{r.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}
