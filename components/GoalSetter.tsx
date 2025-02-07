import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function GoalSetter() {
  return (
    <div className="card p-8">
      <Label htmlFor="goals" className="text-lg font-medium block mb-4 text-slate-700">
        Describe your branding goals
      </Label>
      <Textarea
        id="goals"
        placeholder="E.g., I want to establish myself as a thought leader in AI and machine learning..."
        className="min-h-[150px] bg-slate-50 border-slate-200 rounded-xl resize-none
                   focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
      />
      <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Be specific about your goals to receive more accurate AI-powered suggestions.
      </div>
    </div>
  )
}

