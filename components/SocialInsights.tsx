import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, TrendingUpIcon, UsersIcon } from "lucide-react"

const insights = [
  {
    platform: "Twitter",
    icon: TwitterIcon,
    color: "text-blue-400",
    bgColor: "bg-blue-50",
    followers: "10.5K",
    engagement: "2.8%",
    posts: "120",
    impressions: "50.2K",
    growth: 8,
  },
  {
    platform: "Instagram",
    icon: InstagramIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    followers: "15.7K",
    engagement: "4.5%",
    posts: "85",
    impressions: "78.9K",
    growth: 15,
  },
  {
    platform: "LinkedIn",
    icon: LinkedinIcon,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    followers: "3,890",
    engagement: "5.1%",
    posts: "45",
    impressions: "22.3K",
    growth: 20,
  },
  {
    platform: "Facebook",
    icon: FacebookIcon,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    followers: "5,234",
    engagement: "3.2%",
    posts: "60",
    impressions: "35.7K",
    growth: 12,
  },
]

export default function SocialInsights() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {insights.map((insight) => (
        <Card key={insight.platform} className="overflow-hidden">
          <CardHeader className={`${insight.bgColor} flex flex-row items-center space-y-0 py-4`}>
            <CardTitle className="text-xl font-bold flex items-center">
              <insight.icon className={`w-6 h-6 ${insight.color} mr-2`} />
              {insight.platform}
            </CardTitle>
            <div className="ml-auto flex items-center space-x-2">
              <UsersIcon className="w-4 h-4 text-gray-500" />
              <span className="font-semibold">{insight.followers}</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Engagement Rate</p>
                <p className="text-2xl font-bold">{insight.engagement}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Posts</p>
                <p className="text-2xl font-bold">{insight.posts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Impressions</p>
                <p className="text-2xl font-bold">{insight.impressions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Growth</p>
                <div className="flex items-center">
                  <TrendingUpIcon className="w-5 h-5 text-green-500 mr-1" />
                  <p className="text-2xl font-bold text-green-500">+{insight.growth}%</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Growth Progress</p>
              <Progress value={insight.growth} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

