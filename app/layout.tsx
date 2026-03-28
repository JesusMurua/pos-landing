import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "POS Táctil — El punto de venta para tu negocio mexicano",
  description:
    "Sistema POS táctil para fondas, abarrotes, cafés y más. Funciona sin internet. 3 meses gratis.",
  openGraph: {
    title: "POS Táctil — El punto de venta para tu negocio mexicano",
    description:
      "Sistema POS táctil para fondas, abarrotes, cafés y más. Funciona sin internet. 3 meses gratis.",
    url: "https://postactil.app",
    siteName: "POS Táctil",
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
