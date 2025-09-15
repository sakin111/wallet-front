import FeaturesSection from "@/components/modules/Homepage/FeaturesSection";
import HeroSection from "@/components/modules/Homepage/HeroSection";
import HowItWorksSection from "@/components/modules/Homepage/HowItWorks";
import SecuritySection from "@/components/modules/Homepage/SecuritySection";
import StatsSection from "@/components/modules/Homepage/StatSection";

export default function HomePage () {
  return (
    <div >
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <SecuritySection/>
      <StatsSection/>
    </div>
  )
}