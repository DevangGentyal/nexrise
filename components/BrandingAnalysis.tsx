import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, PieChart } from "lucide-react"

export default function BrandingAnalysis() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Branding Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center items-center h-40 bg-gray-100 rounded-lg">
          <BarChart className="w-20 h-20 text-blue-300" />
        </div>
        <div className="flex justify-center items-center h-40 bg-gray-100 rounded-lg">
          <PieChart className="w-20 h-20 text-green-300" />
        </div>
      </CardContent>
    </Card>
  )
}

