"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ElementType;
  description?: string;
}

interface ResponsiveTabsProps {
  tabs: TabItem[];
  currentTab: string;
  baseUrl: string; // e.g. "/dashboard/listings"
  tabParamName?: string; // default: "tab"
}

function getTabHref(
  baseUrl: string,
  tabParamName: string,
  value: string,
  tabs: TabItem[],
  searchParams: URLSearchParams
) {
  const params = new URLSearchParams(searchParams.toString());
  if (value === tabs[0].value) {
    params.delete(tabParamName);
  } else {
    params.set(tabParamName, value);
  }
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

export function ResponsiveTabs({
  tabs,
  currentTab,
  baseUrl,
  tabParamName = "tab",
}: ResponsiveTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [visibleTabs, setVisibleTabs] = useState<TabItem[]>(tabs.slice(0, 4));
  const [overflowTabs, setOverflowTabs] = useState<TabItem[]>(tabs.slice(4));

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let maxVisible = 4;
      if (screenWidth < 640) {
        maxVisible = 2;
      } else if (screenWidth < 768) {
        maxVisible = 3;
      } else if (screenWidth < 1024) {
        maxVisible = 4;
      } else {
        maxVisible = 5;
      }
      setVisibleTabs(tabs.slice(0, maxVisible));
      setOverflowTabs(tabs.slice(maxVisible));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [tabs]);

  const handleTabChange = (value: string) => {
    const url = getTabHref(baseUrl, tabParamName, value, tabs, searchParams);
    router.push(url);
  };

  return (
    <div className="mb-6 mt-6">
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="flex w-full gap-1 p-1 bg-transparent ">
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex-auto  items-center justify-center space-x-1 sm:space-x-2 
    data-[state=active]:bg-primary/20 data-[state=active]:text-primary 
    text-sm sm:text-base"
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span className="font-medium">{tab.label}</span>
              </TabsTrigger>
            );
          })}

          {overflowTabs.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center px-3 py-2 h-auto"
                >
                  <MoreHorizontal className="w-4 h-4" />
                  <span className="ml-1">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {overflowTabs.map((tab) => {
                  const Icon = tab.icon;
                  const href = getTabHref(
                    baseUrl,
                    tabParamName,
                    tab.value,
                    tabs,
                    searchParams
                  );
                  return (
                    <a
                      key={tab.value}
                      href={href}
                      style={{ textDecoration: "none", color: "inherit" }}
                      tabIndex={-1}
                    >
                      <DropdownMenuItem
                        onClick={() => handleTabChange(tab.value)}
                        className={`cursor-pointer flex items-center gap-2 ${
                          currentTab === tab.value
                            ? "text-black font-medium"
                            : ""
                        }`}
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        {tab.label}
                      </DropdownMenuItem>
                    </a>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </TabsList>
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            {tabs.find((tab) => tab.value === currentTab)?.description}
          </p>
        </div>
      </Tabs>
    </div>
  );
}
