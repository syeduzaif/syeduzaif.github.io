import { Hero } from "@/components/sections/Hero";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Approach } from "@/components/sections/Approach";
import { Ownership } from "@/components/sections/Ownership";
import { CreativeWork } from "@/components/sections/CreativeWork";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { CurrentDirection } from "@/components/sections/CurrentDirection";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <FeaturedWork />
      <Approach />
      <Ownership />
      <CreativeWork />
      <AboutPreview />
      <CurrentDirection />
      <Contact />
    </>
  );
}
