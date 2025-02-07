import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "lucide-react"

const socials = [
  {
    name: "Facebook",
    icon: FacebookIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    connected: false,
  },
  {
    name: "Twitter",
    icon: TwitterIcon,
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
  {
    name: "LinkedIn",
    icon: LinkedinIcon,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    connected: false,
  },
]

export default function SocialConnector() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {socials.map((social) => (
        <div key={social.name} className="relative">
          <div
            className={`
            card card-hover aspect-square p-6
            flex flex-col items-center justify-center gap-4
            ${social.connected ? "border-blue-200" : "border-slate-200"}
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
              <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

