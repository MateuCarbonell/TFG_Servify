"use client";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

export default function SplineWrapper() {
  return (
    <div className="absolute inset-0 z-0">
      <Spline scene="https://prod.spline.design/95uJI9Vk-qpD3t18/scene.splinecode" />
    </div>
  );
}
