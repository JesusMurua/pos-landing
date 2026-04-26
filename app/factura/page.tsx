import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FacturaWizard from "@/components/factura/FacturaWizard";

export const metadata: Metadata = {
  title: "Facturación - FINO",
  description:
    "Genera tu factura electrónica (CFDI) a partir de tu ticket de compra. Servicio gratuito para clientes de negocios que usan FINO.",
  openGraph: {
    title: "Facturación - FINO",
    description:
      "Genera tu factura electrónica (CFDI) a partir de tu ticket de compra. Servicio gratuito para clientes de negocios que usan FINO.",
    url: "https://finomx.app/factura",
    siteName: "FINO",
    locale: "es_MX",
    type: "website",
  },
};

export default function FacturaPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <FacturaWizard />
      </main>
      <Footer />
    </>
  );
}
