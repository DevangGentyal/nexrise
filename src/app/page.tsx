import SocialConnector from "@/components/SocialConnector"
import GoalSetter from "@/components/GoalSetter"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl space-y-12">
        <h1 className="text-4xl font-bold text-center">
          AI-Powered Personal Branding Assistant
        </h1>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Connect Your Socials</h2>
          <SocialConnector />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Set Your Branding Goals</h2>
          <GoalSetter />
        </section>

        <div className="text-center">
          <Button variant="default" className="text-lg" asChild>
            <a href="/analysis">Analyze My Brand</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

