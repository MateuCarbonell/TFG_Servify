import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import PageTransition from "@/components/PageTransition"; // 👈 NUEVO

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Servify",
  description: "Encuentra y reserva servicios de calidad cerca de ti",
  icons: {
    icon: "/favicon.ico", // 👈 esta línea es la clave
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavbarWrapper />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
      </body>
    </html>
  );
}
