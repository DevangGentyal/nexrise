"use client"

import SocialConnector from "@/components/SocialConnector"
import GoalSetter from "@/components/GoalSetter"
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import { XIcon, InstagramIcon } from "@/components/icons/icons"

type Social = {
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  connected: boolean;
};

export default function Home() {
  const initialSocials: Social[] = [
    {
      name: "X (Twitter)",
      icon: XIcon,
      color: "text-blue-400",
      bgColor: "bg-blue-50",
      connected: false,
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      connected: false,
    },
  ];

  const [socials, setSocials] = useState<Social[]>(initialSocials);
  const [goals, setGoals] = useState<string[]>([]);

  const isAnalyzeDisabled = () => {
    const hasSocialConnected = socials.some(social => social.connected);
    const hasGoals = goals.length > 0;
    return !hasSocialConnected || !hasGoals;
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl space-y-12">
        <h1 className="text-4xl font-bold text-center">
          AI-Powered Personal Branding Assistant
        </h1>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Connect Your Socials</h2>
          <div className="flex justify-center">
            <SocialConnector setSocials={setSocials} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Set Your Branding Goals</h2>
          <GoalSetter setGoals={setGoals} />
        </section>
      </div>
    </div>
  )
}

