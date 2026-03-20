import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedVehicles from "@/components/FeaturedVehicles";
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
      <FeaturedVehicles />
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
