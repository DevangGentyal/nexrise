"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users as UsersIcon, Instagram as InstagramIcon } from "lucide-react";

// User ID (Set this dynamically based on logged-in user)
const user_id = 2; // Change this dynamically if needed

export default function SocialMetrics() {
  const [socialMetrics, setSocialMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const socialRes = await fetch("/api/read", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id, column: "socialMetrics" }),
        });
  
        const data = await socialRes.json();
        console.log("Metrics Fetched Data:", data); // Debugging
  
        setSocialMetrics(data?.data || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  

  if (loading) return <p>Loading...</p>;
  if (!socialMetrics && !loading) return <p>No data found.</p>;


  return (
    <div className="grid grid-cols-1 gap-6">
      
        <Card key='Instagram' className="overflow-hidden">
          <CardHeader className={`bg-pink-50 flex flex-row items-center space-y-0 py-4`}>
            <CardTitle className="text-xl font-bold flex items-center">
              <InstagramIcon className={`w-6 h-6 text-pink-500 mr-2`} />
              Instagram
            </CardTitle>
            <div className="ml-auto flex items-center space-x-2">
              <UsersIcon className="w-4 h-4 text-gray-500" />
              <span className="font-semibold">{socialMetrics.followers} Followers</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Profile Engagement Rate</p>
                <p className="text-2xl font-bold">{socialMetrics.engagement_rate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Posts</p>
                <p className="text-2xl font-bold">{socialMetrics.total_posts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Image Posts Likes</p>
                <p className="text-2xl font-bold">{socialMetrics.average_likes.posts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Reels Likes</p>
                <p className="text-2xl font-bold">{socialMetrics.average_likes.reels}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Album Likes</p>
                <p className="text-2xl font-bold">{socialMetrics.average_likes.albums}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Reach (Unique Viewers)</p>
                <p className="text-2xl font-bold">{socialMetrics.reach} people</p>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
