import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    href: "#",
    priceMonthly: "$15",
    description: "Everything you need to get started with personal branding.",
    features: ["AI-driven brand analysis", "Basic content planning", "Weekly performance reports", "Email support"],
  },
  {
    name: "Professional",
    id: "tier-professional",
    href: "#",
    priceMonthly: "$30",
    description: "Advanced features for serious personal brand builders.",
    features: [
      "All Starter features",
      "Advanced AI insights",
      "Daily content suggestions",
      "Real-time performance tracking",
      "Priority email & chat support",
    ],
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "Custom",
    description: "Dedicated support and enterprise features for your team.",
    features: [
      "All Professional features",
      "Custom AI model training",
      "Dedicated account manager",
      "API access",
      "24/7 phone & email support",
    ],
  },
]

export default function Pricing() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose the plan that's right for you and start building your personal brand with AI today.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-border sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          {tiers.map((tier, tierIdx) => (
            <Card
              key={tier.id}
              className={`${tierIdx === 1 ? "lg:z-10 lg:rounded-b-none" : ""} ${
                tierIdx === 0 ? "lg:rounded-r-none" : ""
              } ${tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : ""} flex flex-col justify-between`}
            >
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight">{tier.priceMonthly}</span>
                  <span className="text-sm font-semibold leading-6 text-muted-foreground">/month</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <a
                  href={tier.href}
                  className="mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Get started
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

