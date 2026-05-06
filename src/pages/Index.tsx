import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CarListing from "@/components/CarListing";
import WhyChooseUs from "@/components/WhyChooseUs";
import VideoShowcase from "@/components/VideoShowcase";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
<CarListing />
      <WhyChooseUs />
      <VideoShowcase />
      <Testimonials />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
