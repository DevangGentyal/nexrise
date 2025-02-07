import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function GoalDescription() {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <CardTitle>Describe Your Branding Goals</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Textarea
          placeholder="I want to be an AI thought leader and inspire others in the tech industry..."
          className="w-full h-32 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </CardContent>
    </Card>
  )
}

