import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin, Twitter, Instagram } from "lucide-react"

export default function SocialMediaLinking() {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle>Connect Your Social Media</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <Button className="w-full bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 text-white rounded-full py-6 flex items-center justify-center space-x-2">
          <Twitter className="w-6 h-6" />
          <span>Connect Twitter</span>
        </Button>
        <Button className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-full py-6 flex items-center justify-center space-x-2">
          <Instagram className="w-6 h-6" />
          <span>Connect Instagram</span>
        </Button>
      </CardContent>
    </Card>
  )
}

