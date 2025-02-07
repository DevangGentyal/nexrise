import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ContentIdeas() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Content Ideas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter your content idea..." />
        <Button className="w-full rounded-full">Enhance with AI</Button>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">AI-enhanced content will appear here...</p>
        </div>
      </CardContent>
    </Card>
  )
}

