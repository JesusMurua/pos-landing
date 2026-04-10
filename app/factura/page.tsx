import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FacturaWizard from "@/components/factura/FacturaWizard";

export const metadata: Metadata = {
  title: "Facturación - Brío",
  description:
    "Genera tu factura electrónica (CFDI) a partir de tu ticket de compra. Servicio gratuito para clientes de negocios que usan Brío.",
  openGraph: {
    title: "Facturación - Brío",
    description:
      "Genera tu factura electrónica (CFDI) a partir de tu ticket de compra. Servicio gratuito para clientes de negocios que usan Brío.",
    url: "https://briopos.app/factura",
    siteName: "Brío",
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
