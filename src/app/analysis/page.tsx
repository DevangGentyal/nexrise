import { Button } from "@/components/ui/button"
import SocialInsights from "@/components/SocialInsights"
import GrowthSuggestions from "@/components/GrowthSuggestions"
import BrandingGoals from "@/components/BrandingGoals"

export default function Analysis() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-12">Your Brand Analysis</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Your Branding Goals</h2>
        <BrandingGoals />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Social Insights</h2>
        <SocialInsights />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Growth Suggestions</h2>
        <GrowthSuggestions />
      </section>

      <div className="text-center">
        <Button size="lg" asChild>
          <a href="/roadmap">Get Full Roadmap</a>
        </Button>
      </div>
    </div>
  )
}

