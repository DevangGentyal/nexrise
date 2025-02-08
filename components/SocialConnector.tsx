'use client'
import { useState, Dispatch, SetStateAction } from 'react';
import { InstagramIcon, XIcon } from "lucide-react"

type Social = {
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  connected: boolean;
};

type SocialConnectorProps = {
  setSocials: Dispatch<SetStateAction<Social[]>>;
};

interface SocialResponse {
  userProfile?: {
    username: string;
    name?: string;
    followers: number;
    following: number;
    profile_pic: string;
  };
  error?: string;
}

export default function SocialConnector({ setSocials }: SocialConnectorProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
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

  const [socials, setSocialsState] = useState<Social[]>(initialSocials);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState<Social | null>(null);

  const handleConnectClick = (social: Social) => {
    setSelectedSocial(social);
    setIsPopupOpen(true);
  };

  const connectToSocial = async (selectedSocial:Social, platform: string, username: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const endpoint = platform === 'X (Twitter)' 
        ? '/api/socials/twitter'
        : '/api/socials/instagram';
        
      console.log("Sending request to:", endpoint);
      console.log("Username:", username);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      const data = await response.json();
      console.log("API Response:", data);
      console.log("Response Status:", data.status);

      if (data.postMetrics) {
        console.log("Social Connected");
        setSocialsState(prevSocials => 
          prevSocials.map(social => 
            social.name === selectedSocial.name ? { ...social, connected: true } : social
          )
        );
        setIsPopupOpen(false);
        setUsername('');
      } else {
        throw new Error(data.error || 'Failed to connect account');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = () => {
    if (selectedSocial) {
      connectToSocial(selectedSocial,selectedSocial.name, username);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-20">
      {socials.map((social) => (
        <div key={social.name} className="relative">
          <div
            onClick={() => handleConnectClick(social)}
            className={`
            card card-hover aspect-square p-10 
            flex flex-col items-center justify-center gap-2
            ${social.connected ? "border-blue-200" : "border-slate-200"} 
            shadow-lg hover:shadow-blue-500/50
            transition-shadow duration-300 cursor-pointer
          `}
          >
            <div
              className={`
              w-16 h-16 rounded-2xl flex items-center justify-center
              ${social.bgColor}
            `}
            >
              <social.icon className={`w-8 h-8 ${social.color}`} />
            </div>
            <span className="text-sm font-medium text-slate-600">{social.name}</span>
            {social.connected && (
              <svg className="absolute top-2 right-2 w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
      ))}
      
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              Enter your {selectedSocial?.name} Username
            </h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 mb-4 w-full"
              placeholder={`@${selectedSocial?.name.toLowerCase()}`}
              disabled={isLoading}
            />
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setIsPopupOpen(false)} 
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleConnect} 
                className={`px-4 py-2 rounded-lg text-white
                  ${isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : 'Connect'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

