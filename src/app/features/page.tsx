import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, Calendar, MessageCircle, TrendingUp } from "lucide-react"

const features = [
  {
    title: "AI-Driven Analysis",
    description: "Get deep insights into your online presence and brand perception.",
    icon: BarChart2,
  },
  {
    title: "Content Planning",
    description: "AI-powered content calendar to keep your brand consistently engaging.",
    icon: Calendar,
  },
  {
    title: "Engagement Strategies",
    description: "Personalized strategies to boost your engagement across platforms.",
    icon: MessageCircle,
  },
  {
    title: "Performance Tracking",
    description: "Real-time tracking and analysis of your brand's performance metrics.",
    icon: TrendingUp,
  },
]

export default function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Powerful Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to build a strong personal brand
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our AI-powered tools provide you with everything you need to analyze, plan, and execute your personal
            branding strategy.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <feature.icon className="h-5 w-5 mr-2 text-primary" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

