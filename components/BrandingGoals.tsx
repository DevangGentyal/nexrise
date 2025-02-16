"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Target } from "lucide-react";

// User ID (Set this dynamically based on logged-in user)
const user_id = 2; // Change this dynamically if needed

export default function BrandingGoals() {
  const [goalData, setGoalData] = useState<any>({});
  const [socialMetrics, setSocialMetrics] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalRes, socialRes] = await Promise.all([
          fetch("/api/read", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id, column: "goals" }),
          }),
          fetch("/api/read", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id, column: "socialMetrics" }),
          }),
        ]);

        const goalData = await goalRes.json();
        const socialMetrics = await socialRes.json();

        setGoalData(goalData?.data || {});
        setSocialMetrics(socialMetrics?.data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!goalData?.metrics || !socialMetrics) return <p>No data found.</p>;

  // Extract Metrics
  const categories = [
    {
      name: "Followers",
      icon: Users,
      goal: `Gain ${goalData.metrics.followers || 0} followers`,
      current: socialMetrics?.user_followers || 0,
      target: goalData.metrics.followers || 0,
      progress:
        ((socialMetrics?.user_followers || 0) / (goalData.metrics.followers || 1)) *
        100,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      name: "Reach",
      icon: Target,
      goal: `Expand reach to ${goalData.metrics.reach || 0}`,
      current: socialMetrics?.reach || 0,
      target: goalData.metrics.reach || 0,
      progress:
        ((socialMetrics?.reach || 0) / (goalData.metrics.reach || 1)) * 100,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      name: "Post Frequency",
      icon: Target,
      goal: `Post ${goalData.metrics.post_frequency || 0} times a week`,
      current: "Undefined",
      target: goalData.metrics.post_frequency || 0,
      progress:
        ((goalData.metrics.post_frequency || 0) / 7) * 100,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      name: "Engagement Rate",
      icon: Target,
      goal: `Increase engagement to ${goalData.metrics.engagement_rate || 0}`,
      current: `${socialMetrics.engagement_rate || 0}`,
      target: `${goalData.metrics.engagement_rate || 0}+`,
      progress:
        ((socialMetrics?.engagement_rate || 0) / (goalData.metrics.engagement_rate || 1)) *
        100,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => (
        <Card key={category.name} className="overflow-hidden">
          <CardHeader
            className={`${category.bgColor} flex flex-row items-center space-y-0 py-4`}
          >
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
              <span className="text-2xl font-bold">
                {category.current.toLocaleString()}
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {category.target.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
