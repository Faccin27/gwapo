import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProcessSection from "@/components/ProcessSection";
import ProjectsSection from "@/components/ProjectsSection";
import ReadyMadeSites from "@/components/ReadyMadeSites";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BeforeAfterSlider
        beforeImage="/images/oldkai.png"
        afterImage="/images/nakai.png"
        height="600px"
      />
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <ReadyMadeSites />
      <ContactSection />
      <Footer />
    </>
  );
}
