"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ImageIcon,
  BarChart3,
  Briefcase,
  Compass,
  Users,
  Calendar,
  ShoppingBag,
} from "lucide-react";
import { FeedModal } from "./feed-modal";
import FeedList from "./feed-list";
import UserAvatar from "../user-avatar";
import { useDrawerStore } from "@/store/drawer-store";

const quickActions = [
  {
    id: "photo",
    label: "Photo",
    icon: ImageIcon,
    color: "text-green-600",
    bgColor: "bg-green-50 hover:bg-green-100",
  },
  {
    id: "poll",
    label: "Poll",
    icon: BarChart3,
    color: "text-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100",
  },
  {
    id: "job",
    label: "Job",
    icon: Briefcase,
    color: "text-purple-600",
    bgColor: "bg-purple-50 hover:bg-purple-100",
  },
];

const feedTabs = [
  {
    id: "discover",
    label: "Discover",
    icon: Compass,
  },
  {
    id: "communities",
    label: "Communities",
    icon: Users,
  },
  {
    id: "events",
    label: "Events",
    icon: Calendar,
  },
  {
    id: "listings",
    label: "Listings",
    icon: ShoppingBag,
  },
];

export function FeedLayout() {
  const drawerStore = useDrawerStore();

  const handleNewPost = (postData: any) => {
    // Handle new post creation - could be managed at page level or via context
    console.log("New post created:", postData);
  };

  const handleQuickAction = (actionId: string) => {
    if (actionId === "photo") {
      drawerStore.setFeedDrawerOpen(true);
    } else if (actionId === "poll") {
      drawerStore.setFeedDrawerOpen(true);
      // Could trigger poll creation directly
    } else if (actionId === "job") {
      drawerStore.setFeedDrawerOpen(true);
      // Could trigger job posting creation directly
    }
  };

  return (
    <div className="space-y-4">
      {/* Enhanced Create Post Section */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* Main Input Area */}
          <div className="p-4">
            <div className="flex items-start gap-3">
              <UserAvatar size={55} />

              <div className="flex-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-gray-500 hover:bg-gray-50 bg-gray-50/50 border border-gray-200 rounded-full px-4 py-3 h-auto font-normal transition-all duration-200 hover:border-gray-300"
                  onClick={() => drawerStore.setFeedDrawerOpen(true)}
                >
                  <span className="text-base">What's on your mind?</span>
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <Button
                      key={action.id}
                      variant="ghost"
                      onClick={() => handleQuickAction(action.id)}
                      className={`flex items-center gap-2 h-auto py-2 px-3 rounded-full transition-all duration-200 ${action.bgColor} border-0`}
                    >
                      <IconComponent className={`h-5 w-5 ${action.color}`} />
                      <span className={`text-sm font-medium ${action.color}`}>
                        {action.label}
                      </span>
                    </Button>
                  );
                })}
              </div>
              <Button
                onClick={() => drawerStore.setFeedDrawerOpen(true)}
                className="bg-gradient-to-r from-primary to-primary-foreground hover:from-primary/90 hover:to-primary-foreground/90 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-200"
              >
                Post
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <Tabs defaultValue="discover" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-4 h-auto p-0  rounded-none">
          {feedTabs.map((tab) => {
            const IconComponent = tab.icon
            return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                     className="flex-1 sm:flex-auto items-center justify-center space-x-1 sm:space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm sm:text-base"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="font-medium">{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
         

   
        {feedTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-4">
            <FeedList activeTab={tab.id} />
          </TabsContent>
        ))}
      </Tabs> */}

      <FeedList />
    </div>
  );
}
