"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Flame, Clock, User } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface DiscussionTabsProps {
  currentTab: string
}

const tabs = [
  {
    value: "trending",
    label: "Trending",
    icon: TrendingUp,
    description: "Most popular discussions",
  },
  {
    value: "hot",
    label: "Hot",
    icon: Flame,
    description: "Active discussions",
  },
  {
    value: "new",
    label: "New",
    icon: Clock,
    description: "Latest discussions",
  },
  {
    value: "my",
    label: "My Forum",
    icon: User,
    description: "Your discussions and activity",
  },
]

export function DiscussionTabs({ currentTab }: DiscussionTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "trending") {
      params.delete("tab")
    } else {
      params.set("tab", value)
    }

    const queryString = params.toString()
    const url = queryString ? `/dashboard/discussions?${queryString}` : "/dashboard/discussions"
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
