import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Target, Handshake, Award } from "lucide-react"

const goalCategories = [
  {
    name: "Reach",
    icon: Users,
    goal: "Increase followers by 20%",
    current: 10000,
    target: 12000,
    progress: 83,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    name: "Collaborations",
    icon: Handshake,
    goal: "Partner with 3 influencers",
    current: 1,
    target: 3,
    progress: 33,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    name: "Content Creation",
    icon: Target,
    goal: "Post 3 times a week",
    current: 2,
    target: 3,
    progress: 66,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    name: "Personal Achievement",
    icon: Award,
    goal: "Speak at 2 industry conferences",
    current: 1,
    target: 2,
    progress: 50,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
]

export default function BrandingGoals() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {goalCategories.map((category) => (
        <Card key={category.name} className="overflow-hidden">
          <CardHeader className={`${category.bgColor} flex flex-row items-center space-y-0 py-4`}>
            <CardTitle className="text-xl font-bold flex items-center">
              <category.icon className={`w-6 h-6 ${category.color} mr-2`} />
              {category.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-4">{category.goal}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Current</span>
              <span className="text-sm text-gray-500">Target</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">{category.current.toLocaleString()}</span>
              <span className="text-2xl font-bold text-blue-600">{category.target.toLocaleString()}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Progress</p>
              <Progress value={category.progress} className="h-2" />
              <p className="text-right text-sm text-gray-500 mt-1">{category.progress}%</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

