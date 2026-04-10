import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brío — La caja que cualquiera puede usar",
  description:
    "Cobra, controla tu inventario y ve tus ventas. Funciona aunque se vaya el internet. Prueba Brío gratis.",
  openGraph: {
    title: "Brío — La caja que cualquiera puede usar",
    description:
      "Cobra, controla tu inventario y ve tus ventas. Funciona aunque se vaya el internet. Prueba Brío gratis.",
    url: "https://briopos.app",
    siteName: "Brío",
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
