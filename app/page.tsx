import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeContent from "@/components/landing/HomeContent";
import { getPlans } from "@/lib/api";

export default async function Home() {
  const plans = await getPlans();

  return (
    <>
      <Navbar />
      <main>
        <HomeContent plans={plans} />
      </main>
      <Footer />
    </>
  );
}
