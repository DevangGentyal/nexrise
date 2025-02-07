import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Hash, Image } from "lucide-react"

export default function SmartSuggestions() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Smart Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Hashtags</h3>
          <div className="flex flex-wrap gap-2">
            {["#branding", "#personalbranding", "#socialmedia", "#marketing"].map((tag) => (
              <div key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center">
                <Hash className="w-4 h-4 mr-1" />
                {tag.slice(1)}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Visuals</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
                <Image className="w-8 h-8 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

