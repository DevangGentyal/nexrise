import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, TrendingUpIcon, UsersIcon } from "lucide-react"

const metrics = [
  
  {
    platform: "Instagram",
    icon: InstagramIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    followers: "83",
    engagement: "43.5%",
    posts: "2",
    posts_likes: "100",
    reels_likes: "200",
    albums_likes: "300",
    reach: "362",
  },
  
  // {
  //   platform: "Twitter",
  //   icon: TwitterIcon,
  //   color: "text-blue-400",
  //   bgColor: "bg-blue-50",
  //   followers: "10.5K",
  //   engagement: "2.8%",
  //   posts: "120",
  //   impressions: "50.2K",
  //   growth: 8,
  // },
]

export default function SocialMetrics() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {metrics.map((metrics) => (
        <Card key={metrics.platform} className="overflow-hidden">
          <CardHeader className={`${metrics.bgColor} flex flex-row items-center space-y-0 py-4`}>
            <CardTitle className="text-xl font-bold flex items-center">
              <metrics.icon className={`w-6 h-6 ${metrics.color} mr-2`} />
              {metrics.platform}
            </CardTitle>
            <div className="ml-auto flex items-center space-x-2">
              <UsersIcon className="w-4 h-4 text-gray-500" />
              <span className="font-semibold">{metrics.followers} Followers</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">ProfileEngagement Rate</p>
                <p className="text-2xl font-bold">{metrics.engagement}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Posts</p>
                <p className="text-2xl font-bold">{metrics.posts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Image Posts Likes</p>
                <p className="text-2xl font-bold">{metrics.posts_likes}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Reels Likes</p>
                <p className="text-2xl font-bold">{metrics.reels_likes}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Album Likes</p>
                <p className="text-2xl font-bold">{metrics.albums_likes}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Reach (Average Unique Viewers)</p>
                <p className="text-2xl font-bold">{metrics.reach} people</p>
              </div>
              {/* <div>
                <p className="text-sm text-gray-500 mb-1">Growth</p>
                <div className="flex items-center">
                  <TrendingUpIcon className="w-5 h-5 text-green-500 mr-1" />
                  <p className="text-2xl font-bold text-green-500">+{metrics.growth}%</p>
                </div>
              </div> */}
            </div>
            {/* <div>
              <p className="text-sm text-gray-500 mb-2">Growth Progress</p>
              <Progress value={metrics.growth} className="h-2" />
            </div> */}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

