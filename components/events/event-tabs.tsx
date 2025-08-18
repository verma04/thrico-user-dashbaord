"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Compass, TrendingUp, Star, User, CheckCircle, Bookmark } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface EventTabsProps {
  currentTab: string
}

const tabs = [
  {
    value: "discover",
    label: "Discover",
    icon: Compass,
    description: "Explore all available event listings",
  },
  {
    value: "trending",
    label: "Trending",
    icon: TrendingUp,
    description: "Most popular and active events",
  },
  {
    value: "featured",
    label: "Featured",
    icon: Star,
    description: "Hand-picked and highlighted events",
  },
  {
    value: "my-events",
    label: "My Events",
    icon: User,
    description: "Events you have created",
  },
  {
    value: "attending",
    label: "Attending",
    icon: CheckCircle,
    description: "Events you are attending",
  },
  {
    value: "saved",
    label: "Saved",
    icon: Bookmark,
    description: "Your saved events",
  },
]

export function EventTabs({ currentTab }: EventTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "discover") {
      params.delete("tab")
    } else {
      params.set("tab", value)
    }

    const queryString = params.toString()
    const url = queryString ? `/dashboard/events?${queryString}` : "/dashboard/events"
    router.push(url)
  }

  return (
    <div className="mb-6">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="flex flex-wrap justify-center sm:justify-start gap-1 p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex-1 sm:flex-auto items-center justify-center space-x-1 sm:space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm sm:text-base"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="inline sm:hidden">{tab.label.charAt(0)}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        <div className="mt-2">
          <p className="text-sm text-gray-600">{tabs.find((tab) => tab.value === currentTab)?.description}</p>
        </div>
      </Tabs>
    </div>
  )
}
