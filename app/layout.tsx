import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaja — Punto de venta simple para tu negocio",
  description:
    "Software punto de venta para restaurantes, tiendas, cafeterías y más. Funciona sin internet. Prueba 3 meses gratis.",
  openGraph: {
    title: "Kaja — Punto de venta simple para tu negocio",
    description:
      "Software punto de venta para restaurantes, tiendas, cafeterías y más. Funciona sin internet. Prueba 3 meses gratis.",
    url: "https://postactil.app",
    siteName: "Kaja",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
