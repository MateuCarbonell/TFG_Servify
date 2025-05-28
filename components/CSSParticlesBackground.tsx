// components/CSSParticlesBackground.tsx
'use client';

import React from "react";
import "./cssParticles.css";

export default function CSSParticlesBackground() {
  const dots = Array.from({ length: 80 });

  return (
    <div className="css-bg-wrapper">
      <div className="gradient-bg" />
      {dots.map((_, i) => (
        <div
          key={i}
          className="dot"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
            /* darle posiciones y comportamientos únicos a cada partícula */
          }}
        />
      ))}
    </div>
  );
}
