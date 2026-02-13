import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProductsSection from "@/components/ProductsSection";
import BusinessDetails from "@/components/BusinessDetails";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <AboutSection />
      <WhyChooseUs />
      <ProductsSection />
      <BusinessDetails />
      <ContactSection />
      <MapSection />
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Index;
