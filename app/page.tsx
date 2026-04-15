import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import CoreValue from "@/components/landing/CoreValue";
import Workflow from "@/components/landing/Workflow";
import UseCases from "@/components/landing/UseCases";
import WaitlistCTA from "@/components/landing/WaitlistCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <CoreValue />
      <Workflow />
      <UseCases />
      <WaitlistCTA />
      <Footer />
    </main>
  );
}
