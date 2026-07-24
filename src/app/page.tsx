import { Hero } from "@/components/sections/Hero";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Approach } from "@/components/sections/Approach";
import { Ownership } from "@/components/sections/Ownership";
import { CreativeWork } from "@/components/sections/CreativeWork";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { Contact } from "@/components/sections/Contact";

/**
 * Homepage order (deliberately tightened — no repeated positioning across
 * sections): experimental hero → evidence strip → selected experiments →
 * how I think (interactive) → ownership map → creative observations →
 * about fragment → contact.
 */
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
      <Contact />
    </>
  );
}
