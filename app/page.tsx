import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GiroSection from "@/components/GiroSection";
import TresRazones from "@/components/TresRazones";
import Features from "@/components/Features";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <GiroSection />
        <TresRazones />
        <Features />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
