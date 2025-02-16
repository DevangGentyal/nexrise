
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BrandingCoach() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI-Powered Branding Coach</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <MessageCircle className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex-grow">
            <p className="text-gray-700">Here's a tip to improve your branding strategy...</p>
          </div>
        </div>
        <Button className="w-full rounded-full">Get More Advice</Button>
      </CardContent>
    </Card>
  )
}

