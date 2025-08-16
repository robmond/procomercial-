import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import PropertyShowcase from "@/components/property-showcase";
import InvestmentCalculator from "@/components/investment-calculator";
import DashboardPreview from "@/components/dashboard-preview";
import InteractiveMap from "@/components/interactive-map";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import WhatsAppChat from "@/components/whatsapp-chat";

export default function Home() {
  return (
    <div className="min-h-screen bg-white stripe-grid">
      <Navigation />
      <HeroSection />
      <PropertyShowcase />
      <InvestmentCalculator />
      <DashboardPreview />
      <InteractiveMap />
      <CTASection />
      <Footer />
      <WhatsAppChat />
    </div>
  );
}
