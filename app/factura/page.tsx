import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FacturaWizard from "@/components/factura/FacturaWizard";

export const metadata: Metadata = {
  title: "Facturación - Kaja",
  description:
    "Genera tu factura electrónica (CFDI) a partir de tu ticket de compra. Servicio gratuito para clientes de negocios que usan Kaja POS.",
  openGraph: {
    title: "Facturación - Kaja",
    description:
      "Genera tu factura electrónica (CFDI) a partir de tu ticket de compra.",
    url: "https://postactil.app/factura",
    siteName: "Kaja",
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
