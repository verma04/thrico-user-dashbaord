"use client"

import React, { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Compass, TrendingUp, Star, User, CheckCircle, Bookmark, Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface ListingTabsProps {
  currentTab: string
}

const tabs = [
  { value: "discover", label: "Discover", icon: Search, description: "Explore all available listings" },
  { value: "trending", label: "Trending", icon: TrendingUp, description: "Most popular and active listings" },
  { value: "featured", label: "Featured", icon: Star, description: "Hand-picked and highlighted opportunities" },
  { value: "my-listings", label: "My Listings", icon: User, description: "Listings you have posted" },
  { value: "applied", label: "Enquiry", icon: CheckCircle, description: "Listings you have applied for" },
  { value: "saved", label: "Saved", icon: Bookmark, description: "Your saved listings" },
]

export function ListingTabs({ currentTab }: ListingTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [visibleTabs, setVisibleTabs] = useState<typeof tabs>(tabs.slice(0, 4))
  const [overflowTabs, setOverflowTabs] = useState<typeof tabs>(tabs.slice(4))

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      let maxVisible = 4
      if (screenWidth < 640) {
        maxVisible = 2
      } else if (screenWidth < 768) {
        maxVisible = 3
      } else if (screenWidth < 1024) {
        maxVisible = 4
      } else {
        maxVisible = 5
      }
      setVisibleTabs(tabs.slice(0, maxVisible))
      setOverflowTabs(tabs.slice(maxVisible))
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "discover") {
      params.delete("tab")
    } else {
      params.set("tab", value)
    }
    const queryString = params.toString()
    const url = queryString ? `/dashboard/listings?${queryString}` : "/dashboard/listings"
    router.push(url)
  }

  return (
    <div className="mb-6 mt-6">
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="flex w-full gap-1 p-1 bg-transparent ">
          {visibleTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex-1 sm:flex-auto items-center justify-center space-x-1 sm:space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm sm:text-base"
              >
                <Icon className="w-4 h-4" />
                <span className="font-normal">{tab.label}</span>
             
              </TabsTrigger>
            )
          })}

          {overflowTabs.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center px-3 py-2 h-auto">
                  <MoreHorizontal className="w-4 h-4" />
                  <span className="ml-1">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {overflowTabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <DropdownMenuItem
                      key={tab.value}
                      onClick={() => handleTabChange(tab.value)}
                      className={`cursor-pointer flex items-center gap-2 ${currentTab === tab.value ? "text-black font-medium" : ""}`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </TabsList>
        <div className="mt-2">
          <p className="text-sm text-gray-600">{tabs.find((tab) => tab.value === currentTab)?.description}</p>
        </div>
      </Tabs>
    </div>
  )
}
