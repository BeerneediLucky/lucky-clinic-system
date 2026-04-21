import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ReviewsSection from "@/components/ReviewsSection";
import GallerySection from "@/components/GallerySection";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BookingForm from "@/components/BookingForm";

const Index = () =>
<>
    <Header />
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ReviewsSection />
      <GallerySection />
      <BookingForm />
      <WhatsAppCTA />
      <LocationSection />
    </main>
    <Footer />
    <FloatingWhatsApp />
  </>;


export default Index;