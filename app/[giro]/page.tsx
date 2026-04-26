import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GiroContent from "@/components/landing/GiroContent";
import { getMacroByApiCategory } from "@/components/landing/macros";
import { getBusinessTypeBySlug, getPlans } from "@/lib/api";

interface PageProps {
  params: Promise<{ giro: string }>;
}

export default async function GiroPage({ params }: PageProps) {
  const { giro } = await params;
  const [data, plans] = await Promise.all([
    getBusinessTypeBySlug(giro),
    getPlans(),
  ]);
  if (!data) notFound();

  const macro = getMacroByApiCategory(data.macroCategory);
  if (!macro) notFound();

  return (
    <>
      <Navbar />
      <main>
        <GiroContent macro={macro} businessType={data} plans={plans} />
      </main>
      <Footer />
    </>
  );
}
