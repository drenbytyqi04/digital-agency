import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Technology } from "@/components/sections/Technology";
import { Industries } from "@/components/sections/Industries";
import { Branding } from "@/components/sections/Branding";
import { WebsiteShowcase } from "@/components/sections/WebsiteShowcase";
import { Automation } from "@/components/sections/Automation";
import { Testimonials } from "@/components/sections/Testimonials";
import { Results } from "@/components/sections/Results";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { StartProject } from "@/components/sections/StartProject";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Work limit={3} />
      <BeforeAfter />
      <Process />
      <WhyUs />
      <Technology />
      <Industries />
      <Branding />
      <WebsiteShowcase />
      <Automation />
      <Testimonials />
      <Results />
      <About />
      <Faq />
      <StartProject />
    </>
  );
}
