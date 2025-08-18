"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Compass, TrendingUp, Star, User, CheckCircle, Bookmark } from "lucide-react" // Import Bookmark icon
import { useRouter, useSearchParams } from "next/navigation"

interface JobTabsProps {
  currentTab: string
}

const tabs = [
  {
    value: "discover",
    label: "Discover",
    icon: Compass,
    description: "Explore all available job listings",
  },
  {
    value: "trending",
    label: "Trending",
    icon: TrendingUp,
    description: "Most popular and active job openings",
  },
  {
    value: "featured",
    label: "Featured",
    icon: Star,
    description: "Hand-picked and highlighted opportunities",
  },
  {
    value: "my-jobs",
    label: "My Jobs",
    icon: User,
    description: "Jobs you have posted",
  },
  {
    value: "applied",
    label: "Applied",
    icon: CheckCircle,
    description: "Jobs you have applied for",
  },
  {
    value: "saved", // Added Saved tab
    label: "Saved",
    icon: Bookmark,
    description: "Your saved job listings",
  },
]

export function JobTabs({ currentTab }: JobTabsProps) {
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
    const url = queryString ? `/dashboard/jobs?${queryString}` : "/dashboard/jobs"
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
                className="flex-1 sm:flex-auto items-center justify-center space-x-1 sm:space-x-2 data-[state=active]:bg-black data-[state=active]:text-white text-sm sm:text-base"
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
