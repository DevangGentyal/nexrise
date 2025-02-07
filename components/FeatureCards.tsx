import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, Calendar, MessageCircle, TrendingUp } from "lucide-react"

const features = [
  { title: "AI-Driven Analysis", icon: BarChart2, color: "from-blue-400 to-blue-600" },
  { title: "Content Planning", icon: Calendar, color: "from-green-400 to-green-600" },
  { title: "Engagement Strategies", icon: MessageCircle, color: "from-yellow-400 to-yellow-600" },
  { title: "Performance Tracking", icon: TrendingUp, color: "from-purple-400 to-purple-600" },
]

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="overflow-hidden transform transition-all hover:scale-105">
          <CardHeader className={`bg-gradient-to-r ${feature.color} text-white`}>
            <CardTitle className="flex items-center space-x-2">
              <feature.icon className="w-6 h-6" />
              <span>{feature.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-600">Experience the power of AI in shaping your personal brand.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

