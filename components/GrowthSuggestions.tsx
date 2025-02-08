'use client'
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, Users, MessageCircle, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { constructFromSymbol } from "date-fns/constants";

// User ID (Set dynamically based on logged-in user)
const user_id = 2; // Change dynamically if needed
async function updateUser(userId: any, column: any, value: any) {
  try {
    const response = await fetch("/api/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, column, value }),
    });

    if (response.status === 204) {
      console.log("User updated successfully (No Content)");
      return;
    }

    if (!response.ok) {
      const errorText = await response.text(); // Read error as text
      throw new Error(errorText || "Something went wrong");
    }

    const data = await response.json();
    console.log("User updated successfully:", data);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

const iconMap = {
  Lightbulb,
  TrendingUp,
  Users,
  MessageCircle,
} as const;

interface Step {
  text: string;
  completed: boolean;
}

interface Suggestion {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
  bgColor: string;
  tags: string[];
  steps: Step[];
  progress: number;
}

const backgroundColors = [
  'bg-amber-100',
  'bg-blue-100',
  'bg-indigo-100',
  'bg-green-100',
  'bg-purple-100',
];

const iconColors = {
  Lightbulb: 'text-amber-500',
  TrendingUp: 'text-blue-500',
  Users: 'text-indigo-500',
  MessageCircle: 'text-green-500',
} as const;

export default function GrowthSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const parseAndValidateSuggestion = (data: any, index: number): Suggestion | null => {
    try {
      const suggestion = typeof data === 'string' ? JSON.parse(data) : data;

      return {
        title: suggestion.title || 'Untitled',
        description: suggestion.description || 'No description available',
        icon: (suggestion.icon in iconMap ? suggestion.icon : 'Lightbulb') as keyof typeof iconMap,
        bgColor: backgroundColors[index % backgroundColors.length],
        tags: suggestion.tags || [],
        steps: suggestion.steps || [],
        progress: suggestion.progress || 0
      };
    } catch (err) {
      console.error("Error parsing suggestion:", err);
      return null;
    }
  };

  useEffect(() => {
    async function fetchSuggestions() {
      setLoading(true);
      setError(null);

      try {
        const fetchGoalData = async () => {
          const response = await fetch("/api/read", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id, column: "goals" }),
          });
          const result = await response.json();
          return result?.data || null;
        };

        const fetchSocialMetrics = async () => {
          const response = await fetch("/api/read", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id, column: "socialMetrics" }),
          });
          const result = await response.json();
          return result?.data || null;
        };

        const [goaldata, socialMetrics] = await Promise.all([fetchGoalData(), fetchSocialMetrics()]);

        if (!goaldata || !socialMetrics) {
          throw new Error("Failed to retrieve goal data or social metrics.");
        }

        const response = await fetch("/api/groq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `Goal: ${JSON.stringify(goaldata)}, Current Metrics: ${JSON.stringify(socialMetrics)}`,
            systemMsg: `Provide personalized structured growth suggestions based on the query in JSON format based on the query.
              Each suggestion should include:
              - title (string)
              - description (string)
              - icon (one of: MessageCircle, TrendingUp, Lightbulb, Users)
              - tags (array of strings)
              - steps (array of objects { text: string, completed: boolean })
              - progress (number: 0-100).
              Output strictly as a JSON array with no additional text. No whitespaces and newlines`,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const growthSuggestions = JSON.parse(await response.json());
        // console.log("GrowthSuggestions Data:", responseData);
        if (!Array.isArray(growthSuggestions)) {
          throw new Error("Unexpected response format.");
        }

        updateUser(2, "insights", growthSuggestions);

        const validSuggestions = growthSuggestions
          .map((data, index) => parseAndValidateSuggestion(data, index))
          .filter((s): s is Suggestion => s !== null);

        if (validSuggestions.length === 0) {
          throw new Error("No valid suggestions found.");
        }

        setSuggestions(validSuggestions);
        localStorage.setItem("growthSuggestions", JSON.stringify(validSuggestions));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load suggestions");
        console.error("Error fetching suggestions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSuggestions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-gray-500">Loading suggestions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 w-full">
      {suggestions.map((suggestion, index) => {
        const Icon = iconMap[suggestion.icon] || iconMap.Lightbulb;
        const iconColor = iconColors[suggestion.icon] || 'text-gray-500';

        return (
          <Card key={index} className="w-full border border-gray-200">
            <CardHeader className={`${suggestion.bgColor} py-4`}>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Icon className={`w-5 h-5 ${iconColor} mr-2`} />
                {suggestion.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-600 text-sm mb-4">{suggestion.description}</p>
              {suggestion.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {suggestion.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              {suggestion.steps.length > 0 && (
                <div className="space-y-2 mb-4">
                  {suggestion.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      <span className="text-md">{step.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
