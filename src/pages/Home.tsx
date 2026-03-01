import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedProducts from "@/components/FeaturedProducts";
import ServicesPreview from "@/components/ServicesPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import BusinessDetails from "@/components/BusinessDetails";
import SEOHead from "@/components/SEOHead";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AI Laptop Wala",
  "alternateName": ["AI Laptop Wala Indore", "Asati Infotech"],
  "url": "https://ailaptopwala.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://ailaptopwala.com/products?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AI Laptop Wala",
  "legalName": "Asati Infotech",
  "url": "https://ailaptopwala.com",
  "logo": "https://ailaptopwala.com/logo.png",
  "foundingDate": "2017-07",
  "founder": { "@type": "Person", "name": "Bhagwan Das Asati" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "LG-21, B-Block, Silver Mall, RNT Marg",
    "addressLocality": "Indore",
    "addressRegion": "Madhya Pradesh",
    "postalCode": "452001",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+919893496163",
    "contactType": "sales",
    "areaServed": ["IN"],
    "availableLanguage": ["Hindi", "English"]
  },
  "sameAs": [
    "https://www.youtube.com/@Ailaptopwala",
    "https://www.instagram.com/Ailaptopwala",
    "https://www.facebook.com/Ailaptopwala",
    "https://wa.me/919893496163"
  ]
};

const Home = () => (
  <>
    <SEOHead
      title="AI Laptop Wala Indore – Best Laptop Shop | MacBook, Gaming Laptop, Refurbished Laptop Dealer"
      description="AI Laptop Wala Indore – Best laptop shop in Indore for premium open-box MacBooks, gaming laptops, refurbished laptops & desktops, AI workstations. Home repair service in Indore. Trusted since 2017 by 5000+ customers. Silver Mall, RNT Marg."
      canonical="/"
      keywords="AI Laptop Wala, AI Laptop Wala Indore, laptop shop Indore, best laptop dealer Indore, MacBook Indore, gaming laptop Indore, refurbished laptop Indore, refurbished desktop Indore, second hand laptop Indore, used laptop Indore, open box laptop Indore, laptop repair Indore, home laptop repair Indore, laptop service center Indore, desktop repair Indore, SSD upgrade Indore, RAM upgrade Indore, AI workstation Indore, business laptop Indore, Asati Infotech, Silver Mall laptop shop, laptop shop near me Indore, computer shop Indore, HP laptop Indore, Dell laptop Indore, Lenovo laptop Indore, Asus laptop Indore, laptop shop Madhya Pradesh, refurbished laptop Madhya Pradesh, best laptop shop MP, laptop dealer MP"
      jsonLd={[websiteSchema, organizationSchema]}
    />
    <HeroSection />
    <AboutSection />
    <WhyChooseUs />
    <FeaturedProducts />
    <ServicesPreview />
    <TestimonialsSection />
    <BusinessDetails />
  </>
);

export default Home;
