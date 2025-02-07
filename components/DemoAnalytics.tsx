import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, PieChart, Pie } from "recharts"

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 278 },
  { name: "May", value: 189 },
]

export default function DemoAnalytics() {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
        <CardTitle>Demo Analytics</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Engagement Rate</h3>
            <BarChart width={200} height={100} data={data}>
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Follower Growth</h3>
            <LineChart width={200} height={100} data={data}>
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Content Distribution</h3>
            <PieChart width={200} height={100}>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
            </PieChart>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

