import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

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
    </>
  );
}
