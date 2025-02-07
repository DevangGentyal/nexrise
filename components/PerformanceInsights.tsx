import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function PerformanceInsights() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-100 p-4 rounded-lg flex items-center">
            <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
            <div>
              <p className="font-semibold">Engagement Rate</p>
              <p className="text-green-700">+5.2%</p>
            </div>
          </div>
          <div className="bg-red-100 p-4 rounded-lg flex items-center">
            <TrendingDown className="w-6 h-6 text-red-500 mr-2" />
            <div>
              <p className="font-semibold">Follower Growth</p>
              <p className="text-red-700">-1.8%</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Multi-Platform Support</h3>
          <p className="text-gray-700">Your content is optimized for LinkedIn, Twitter, and Instagram.</p>
        </div>
      </CardContent>
    </Card>
  )
}

