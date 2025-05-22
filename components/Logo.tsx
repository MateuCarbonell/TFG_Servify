"use client"; // obligatorio si estás en App Router
// components/Logo.tsx
import { useRouter } from "next/navigation"; // cambia a "next/router" si usas Pages Router
import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return (
    <div>
      <Image
        src="/assets/logo.png"
        width={100}
        height={100}
        alt="Logo"
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
    </div>
  );
};

export default Logo;
