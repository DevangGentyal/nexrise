"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface GoalSetterProps {
  setGoals: React.Dispatch<React.SetStateAction<string[]>>;
}
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

export default function GoalSetter({ setGoals }: GoalSetterProps) {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (inputValue.trim()) {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: inputValue,
          systemMsg: `The above is a raw text of the goals that the user wants to achieve. I want you to go through the text and give me a proper breakdown of goals into metrics values which can be used to track the progress of the goals. Some users may not mention the metrics values, in that case, you can imagine the metrics values based on the goals. Also give an additional field as 'description' which will be a optimized description of the goal. I want the response to be in the JSON format with no other text. These metrics shold be fixed, no other metrics should be added. Don't miss any of the following fields: goal, metrics, description. These are the metrics that should be included: niche of the creator,followers, engagement rate, reach and post frequency. And the goals and metrics are about Social Media. the goal should be the same as the input text. MOST IMPORTANT THING IS TO HAVE NO slash or new lines in the output. Pure Json object with no whitespaces also.
          Example:
          {"goal":"I want to become a top gamer influencer on Instagram","niche":"Gaming|Editing" "metrics":{"followers":"10M+","engagement_rate":"5%-15%","reach":"2M-30M+","post_frequency":"5-7"},"description":"Becoming one of the top gamers on Instagram"}
          `,
        }),
      });

      const goalsData =  JSON.parse(await response.json());
      console.log("NLP Processed Data:", goalsData);
      
      // Insert the goals into the database
      // Update in Database
      updateUser(2, "goals", goalsData);

      // Next Page
      router.push("/analysis");

      setInputValue("");
    }
  };

  return (
    <div className="card p-8 shadow-lg shadow-blue-500/100">
      <Label htmlFor="goals" className="text-lg font-medium block mb-4 text-slate-700">
        Describe your branding goals
      </Label>
      <Textarea
        id="goals"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="E.g., I want to become a top 100 influencer on Instagram"
        className="min-h-[150px] bg-slate-50 border-slate-200 rounded-xl resize-none
                   focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
      />

      {/* Conditionally render the Submit Goal button */}
      <div className="mt-6 flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={!inputValue.trim()}
          className="bg-black hover:bg-blue-600 text-white">
          Continue
        </Button>
      </div>

      <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Be specific about your goals to receive more accurate AI-powered suggestions.
      </div>
    </div>
  );
}

