"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AIContentGenerator from "@/components/AIContentGenerator";
import { Button } from "@/components/ui/button";

// User ID (Set dynamically based on logged-in user)
const user_id = 2; // Change dynamically if needed

interface RoadmapStep {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  estimatedTime: number;
  dependencies?: string[];
}

export default function Roadmap() {
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoadmap() {
      setLoading(true);
      setError(null);

      const storedSuggestions = localStorage.getItem("growthSuggestions");

      if (!storedSuggestions) {
        setError("No growth suggestions found.");
        setLoading(false);
        return;
      }

      try {
        const fetchSuggestions = async () => {
          const response = await fetch("/api/read", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id, column: "insights" }),
          });
          const result = await response.json();
          return result?.data || null;
        };

        const suggestionsData = await fetchSuggestions();
        
        const response = await fetch("/api/groq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: "Suggestions: "+JSON.stringify(suggestionsData),
            systemMsg: `Given these growth suggestions, create a structured roadmap in JSON format.
              Each roadmap step should include:
              - title (string)
              - description (string)
              - priority (low, medium, high)
              - estimatedTime (in days)
              - dependencies (array of strings, optional)
              the output should be in JSON format only. no header or footer text. give only the json object. Start with the {} iteself dont mention json or anything. give only what asked
              `,
            growthSuggestions: JSON.parse(storedSuggestions),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawText = await response.text();
        
        // Try to parse the response as JSON directly first
        try {
          const data = JSON.parse(rawText);
          const roadmapData = data.roadmap || data;
          
          if (!Array.isArray(roadmapData)) {
            throw new Error("Invalid roadmap format. Expected an array.");
          }
          
          setRoadmapSteps(roadmapData);
        } catch (parseError) {
          // If direct parsing fails, try cleaning the string
          const cleanedText = rawText
            .replace(/^"|"$/g, "") // Remove starting/ending quotes
            .replace(/\\"/g, '"') // Replace escaped quotes
            .replace(/\\n/g, "\n"); // Replace escaped newlines
          
          const data = JSON.parse(cleanedText);
          const roadmapData = data.roadmap || data;
          
          if (!Array.isArray(roadmapData)) {
            throw new Error("Invalid roadmap format. Expected an array.");
          }
          
          setRoadmapSteps(roadmapData);
        }
      } catch (err) {
        console.error("Roadmap Error:", err);
        setError(err instanceof Error ? err.message : "Failed to load roadmap");
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmap();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-12">Your Personalized Roadmap</h1>

      {loading && (
        <div className="text-center">
          <p className="text-gray-500">Generating roadmap...</p>
        </div>
      )}
      
      {/* {error && (
        <div className="text-center mb-8">
          <p className="text-red-500">Error: {error}</p>
        </div>
      )} */}

      <div className="space-y-4">
        {roadmapSteps.length > 0 ? (
          roadmapSteps.map((step, index) => (
            <Card key={index} className="border-l-4" style={{ borderLeftColor: getPriorityColor(step.priority).replace("text", "border") }}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    {index + 1}. {step.title}
                  </CardTitle>
                  <span className={`text-sm font-medium ${getPriorityColor(step.priority)}`}>
                    {step.priority.charAt(0).toUpperCase() + step.priority.slice(1)} Priority
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{step.description}</p>
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                  <span>Estimated time: {step.estimatedTime} days</span>
                  {step.dependencies && step.dependencies.length > 0 && (
                    <span>Dependencies: {step.dependencies.join(", ")}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          !loading && !error && (
            <p className="text-center text-gray-500">No roadmap data available.</p>
          )
        )}
      </div>
        <br /><br />
      <div className="text-center">
        <Button size="lg" asChild>
          <a href="/ai_content_generator">AI Content Generator</a>
        </Button>
      </div>
    </div>
  );
}

