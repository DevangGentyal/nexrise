import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  { title: "Define Your Brand", description: "Clarify your unique value proposition and target audience." },
  { title: "Optimize Profiles", description: "Enhance your social media profiles for maximum impact." },
  { title: "Create Content Strategy", description: "Develop a content plan that resonates with your audience." },
  { title: "Engage and Network", description: "Actively engage with your audience and build meaningful connections." },
  { title: "Analyze and Adjust", description: "Regularly review your performance and refine your strategy." },
]

export default function BrandingRoadmap() {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardTitle>Your Branding Roadmap</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

