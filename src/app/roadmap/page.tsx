import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AIContentGenerator from "@/components/AIContentGenerator"

const roadmapSteps = [
  { title: "Analyze Current Brand", description: "Review your current online presence and brand perception." },
  { title: "Set Clear Goals", description: "Define specific, measurable objectives for your personal brand." },
  { title: "Develop Content Strategy", description: "Plan your content themes, formats, and posting schedule." },
  { title: "Create Engaging Content", description: "Produce high-quality, valuable content for your audience." },
  { title: "Optimize Profiles", description: "Ensure all your social profiles are complete and consistent." },
  { title: "Engage with Your Audience", description: "Regularly interact with followers and industry peers." },
  { title: "Monitor and Adjust", description: "Track your progress and adjust your strategy as needed." },
]

export default function Roadmap() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-12">Your Branding Roadmap</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Step-by-Step Plan</h2>
        <div className="space-y-4">
          {roadmapSteps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {index + 1}. {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">AI-Generated Content</h2>
        <AIContentGenerator />
      </section>
    </div>
  )
}

