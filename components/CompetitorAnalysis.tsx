import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export default function CompetitorAnalysis() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Competitor Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center items-center h-40 bg-gray-100 rounded-lg">
          <TrendingUp className="w-20 h-20 text-red-300" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Key Insights</h3>
          <ul className="list-disc list-inside">
            <li>Insight 1</li>
            <li>Insight 2</li>
            <li>Insight 3</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

