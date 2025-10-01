"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CreateCommunity from "@/components/community/create/create-community";
import { cn } from "@/lib/utils";
import {
  Users,
  TrendingUp,
  Star,
  User,
  CheckCircle,
  Bookmark,
  Plus,
} from "lucide-react";
import { ResponsiveTabs } from "@/components/ui/responsive-tabs";
import { Search } from "lucide-react";
import { useDrawerStore } from "@/store/drawer-store";

interface CommunitiesLayoutProps {
  children: ReactNode;
}

type TabItem = {
  value: string;
  label: string;
  icon: React.ElementType;
  description: string;
};

const tabs: TabItem[] = [
  {
    value: "discover",
    label: "Discover",
    icon: Search,
    description: "Explore all available listings",
  },
  {
    value: "trending",
    label: "Trending",
    icon: TrendingUp,
    description: "Most popular and active listings",
  },
  {
    value: "featured",
    label: "Featured",
    icon: Star,
    description: "Hand-picked and highlighted opportunities",
  },
  {
    value: "my-listings",
    label: "My Listings",
    icon: User,
    description: "Listings you have posted",
  },
  {
    value: "applied",
    label: "Enquiry",
    icon: CheckCircle,
    description: "Listings you have applied for",
  },
  {
    value: "saved",
    label: "Saved",
    icon: Bookmark,
    description: "Your saved listings",
  },
];

export default function CommunitiesLayout({
  children,
}: CommunitiesLayoutProps) {
  const pathname = usePathname();
  const setDrawerOpen = useDrawerStore((s) => s.setCommunityDrawerOpen);
  const getActiveTab = () => {
    return tabs.find((tab) => tab.href === pathname) || tabs[0];
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="">
        <div className="px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {activeTab.label}
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                {activeTab.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <a
                  href="/dashboard/communities/analytics"
                  className="flex items-center gap-2"
                >
                  <Star className="w-4 h-4" />
                  Analytics
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="/dashboard/communities/manage"
                  className="flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Manage
                </a>
              </Button>

              <Button>
                <Plus
                  onClick={() => setDrawerOpen(true)}
                  className="w-4 h-4 mr-2"
                />
                Create Community
              </Button>
            
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}

      <ResponsiveTabs
        tabs={tabs}
        currentTab={"discover"}
        baseUrl="/dashboard/communities"
      />
  <CreateCommunity />
      {/* Page Content */}
      {children}
    </div>
  );
}
