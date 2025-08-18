"use client"

import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

type TabValue = "discover" | "trending" | "featured" | "my-communities"

interface CommunityBreadcrumbProps {
  currentTab: TabValue
}

const TAB_LABELS = {
  discover: "Discover All",
  trending: "Trending",
  featured: "Featured",
  "my-communities": "My Communities",
}

export function CommunityBreadcrumb({ currentTab }: CommunityBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <Link href="/dashboard" className="flex items-center hover:text-gray-900">
        <Home className="w-4 h-4" />
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link href="/dashboard/communities" className="hover:text-gray-900">
        Communities
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-gray-900 font-medium">{TAB_LABELS[currentTab]}</span>
    </nav>
  )
}
