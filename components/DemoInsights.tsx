import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react"

const insights = [
  {
    title: "Strength",
    icon: TrendingUp,
    color: "text-green-500",
    description: "Your engagement rate is above industry average.",
  },
  {
    title: "Opportunity",
    icon: Lightbulb,
    color: "text-yellow-500",
    description: "Increase your posting frequency to grow your audience.",
  },
  {
    title: "Weakness",
    icon: AlertTriangle,
    color: "text-red-500",
    description: "Your content lacks consistency across platforms.",
  },
]

export default function DemoInsights() {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-400 to-pink-500 text-white">
        <CardTitle>Your Branding Insights</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className={`bg-gradient-to-br from-gray-50 to-gray-100`}>
                <CardTitle className="flex items-center space-x-2">
                  <insight.icon className={`w-6 h-6 ${insight.color}`} />
                  <span>{insight.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-600">{insight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

