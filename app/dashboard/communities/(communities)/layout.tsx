"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CreateCommunity from "@/components/community/create/create-community"
import { cn } from "@/lib/utils"
import { Users, TrendingUp, Star, User, CheckCircle, Bookmark } from "lucide-react"

interface CommunitiesLayoutProps {
  children: ReactNode
}

const tabs = [
  {
    href: "/dashboard/communities",
    label: "Discover All",
    icon: Users,
    title: "Communities",
    subtitle: "Discover and join amazing communities",
    description: "Explore all available communities",
  },
  {
    href: "/dashboard/communities/trending",
    label: "Trending",
    icon: TrendingUp,
    title: "Trending Communities",
    subtitle: "Most popular and active communities",
    description: "Most popular and active communities",
  },
  {
    href: "/dashboard/communities/featured",
    label: "Featured",
    icon: Star,
    title: "Featured Communities",
    subtitle: "Hand-picked and highlighted communities",
    description: "Hand-picked and highlighted communities",
  },
  {
    href: "/dashboard/communities/my-communities",
    label: "My Communities",
    icon: User,
    title: "My Communities",
    subtitle: "Communities you have created",
    description: "Communities you have created",
  },
  {
    href: "/dashboard/communities/joined",
    label: "Joined",
    icon: CheckCircle,
    title: "Joined Communities",
    subtitle: "Communities you have joined",
    description: "Communities you have joined",
  },
  {
    href: "/dashboard/communities/saved",
    label: "Saved",
    icon: Bookmark,
    title: "Saved Communities",
    subtitle: "Your saved communities",
    description: "Your saved communities",
  },
]

export default function CommunitiesLayout({ children }: CommunitiesLayoutProps) {
  const pathname = usePathname()

  const getActiveTab = () => {
    return tabs.find(tab => tab.href === pathname) || tabs[0]
  }

  const activeTab = getActiveTab()

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{activeTab.title}</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">{activeTab.subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href="/dashboard/communities/analytics" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Analytics
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/dashboard/communities/manage" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Manage
                </a>
              </Button>
              <CreateCommunity />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 md:px-6">
          {/* Tab List */}
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = pathname === tab.href
              
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "flex items-center whitespace-nowrap space-x-1 px-2 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors min-w-fit",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="inline sm:hidden text-xs">{tab.label.split(' ')[0]}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Page Content */}
      {children}
    </div>
  )
}
