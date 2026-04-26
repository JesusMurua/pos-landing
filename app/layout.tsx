import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "FINO | El sistema que se adapta a tu negocio",
  description:
    "Flujo Inteligente de Negocios y Operaciones. Punto de venta 100% offline, facturación CFDI y control total.",
  openGraph: {
    title: "FINO | El sistema que se adapta a tu negocio",
    description:
      "Flujo Inteligente de Negocios y Operaciones. Punto de venta 100% offline, facturación CFDI y control total.",
    url: "https://finomx.app",
    siteName: "FINO",
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
    <html lang="es-MX" className={`${inter.variable} ${instrumentSerif.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
