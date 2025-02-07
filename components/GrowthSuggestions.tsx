import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, TrendingUp, Users, MessageCircle, CheckCircle2 } from "lucide-react"

const suggestions = [
  {
    title: "Increase Twitter Engagement",
    description: "Post more consistently on Twitter to boost engagement.",
    icon: MessageCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    tags: ["Twitter", "Engagement"],
    steps: [
      { text: "Schedule 3 tweets per day", completed: true },
      { text: "Use relevant hashtags", completed: true },
      { text: "Engage with followers' content", completed: false },
      { text: "Run a Twitter poll", completed: false },
    ],
    progress: 50,
  },
  {
    title: "Optimize Instagram Hashtags",
    description: "Use more relevant hashtags on Instagram to reach a wider audience.",
    icon: TrendingUp,
    color: "text-pink-500",
    bgColor: "bg-pink-100",
    tags: ["Instagram", "Reach"],
    steps: [
      { text: "Research trending hashtags", completed: true },
      { text: "Create branded hashtag", completed: true },
      { text: "Use location-based hashtags", completed: false },
      { text: "Analyze hashtag performance", completed: false },
    ],
    progress: 50,
  },
  {
    title: "LinkedIn Thought Leadership",
    description: "Share more industry insights on LinkedIn to establish thought leadership.",
    icon: Lightbulb,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    tags: ["LinkedIn", "Authority"],
    steps: [
      { text: "Write 1 long-form article", completed: true },
      { text: "Share 2 industry news items", completed: true },
      { text: "Comment on 5 posts in your network", completed: false },
      { text: "Participate in a LinkedIn group discussion", completed: false },
    ],
    progress: 50,
  },
  {
    title: "Facebook Live Engagement",
    description: "Engage more with your Facebook followers through live videos and Q&A sessions.",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    tags: ["Facebook", "Live", "Interaction"],
    steps: [
      { text: "Schedule your first live session", completed: true },
      { text: "Promote the live session", completed: true },
      { text: "Prepare talking points", completed: false },
      { text: "Host a 30-minute Q&A", completed: false },
    ],
    progress: 50,
  },
]

export default function GrowthSuggestions() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {suggestions.map((suggestion, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className={`${suggestion.bgColor} flex flex-row items-center space-y-0 py-4`}>
            <CardTitle className="text-xl font-bold flex items-center">
              <suggestion.icon className={`w-6 h-6 ${suggestion.color} mr-2`} />
              {suggestion.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-4">{suggestion.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestion.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="space-y-2 mb-4">
              {suggestion.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="flex items-center">
                  <CheckCircle2 className={`w-5 h-5 mr-2 ${step.completed ? "text-green-500" : "text-gray-300"}`} />
                  <span className={step.completed ? "text-gray-700" : "text-gray-500"}>{step.text}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Progress</p>
              <Progress value={suggestion.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

