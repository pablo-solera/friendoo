import { FaqSection } from "@/components/landing/faq-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHero } from "@/components/landing/landing-hero";
import { getUser } from "@/lib/auth";

export default async function Home() {
  const user = await getUser();

  return (
    <main className="min-h-dvh overflow-hidden bg-[#fff7ea] text-[#17120f]">
      <LandingHero user={user} />
      <HowItWorksSection />
      <FaqSection />
      <LandingFooter />
    </main>
  );
}
