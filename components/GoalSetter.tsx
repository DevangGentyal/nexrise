"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from 'react'

interface GoalSetterProps {
  setGoals: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function GoalSetter({ setGoals }: GoalSetterProps) {
  const [inputValue, setInputValue] = useState("");
  const [goals, setLocalGoals] = useState<string[]>([]);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      const newGoals = [...goals, inputValue.trim()];
      setLocalGoals(newGoals);
      setGoals(newGoals);
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
        placeholder="E.g., I want to establish myself as a thought leader in AI and machine learning..."
        className="min-h-[150px] bg-slate-50 border-slate-200 rounded-xl resize-none
                   focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
      />
      
      {/* Display entered goals */}
      {goals.length > 0 && (
        <div className="mt-4 space-y-2">
          {goals.map((goal, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
              <span className="text-sm text-slate-700">{goal}</span>
              <button
                onClick={() => {
                  const newGoals = goals.filter((_, i) => i !== index);
                  setLocalGoals(newGoals);
                  setGoals(newGoals);
                }}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={!inputValue.trim()}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Submit Goal
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

