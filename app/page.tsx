import { Navbar } from "@/components/liquan/navbar"
import { HeroSection } from "@/components/liquan/hero-section"
import { BrandConcept } from "@/components/liquan/brand-concept"
import { ProductShowcase } from "@/components/liquan/product-showcase"
import { AiRecommend } from "@/components/liquan/ai-recommend"
import { SceneStory } from "@/components/liquan/scene-story"
import { FinalCTA } from "@/components/liquan/final-cta"
import { Footer } from "@/components/liquan/footer"

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(184,144,70,0.12),transparent_18%),linear-gradient(180deg,#04110f_0%,#071715_22%,#050c0c_52%,#040707_100%)] text-[var(--brand-cream)]">
      <Navbar />
      <HeroSection />
      <BrandConcept />
      <ProductShowcase />
      <AiRecommend />
      <SceneStory />
      <FinalCTA />
      <Footer />
    </main>
  )
}
