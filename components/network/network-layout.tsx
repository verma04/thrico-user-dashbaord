"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NetworkStats } from "./network-stats";
import { MyConnections } from "./my-connections";
import { FriendRequests } from "./friend-requests";
import { FindFriends } from "./find-friends";
import { NetworkSidebar } from "./network-sidebar";
import { Users, UserPlus, UserCheck } from "lucide-react"; // Example icons

export function NetworkLayout() {
    const [activeTab, setActiveTab] = useState("discover");
    const tabs = [
        {
            value: "discover",
            label: "Find Friends",
            icon: UserPlus,
            content: <FindFriends />,
        },
        {
            value: "friends",
            label: "My Network",
            icon: Users,
            content: (
                <>
                    <NetworkStats />
                    <MyConnections />
                </>
            ),
        },
        {
            value: "requests",
            label: "Friend Requests",
            icon: UserCheck,
            content: <FriendRequests />,
        },
    ];

    return (
        <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="flex flex-wrap justify-center sm:justify-start gap-1 p-1">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className="flex-1 sm:flex-auto items-center justify-center space-x-1 sm:space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm sm:text-base"
                                    >
                                        {Icon && <Icon className="w-4 h-4" />}
                                        <span className="hidden sm:inline">{tab.label}</span>
                                        <span className="inline sm:hidden">{tab.label.charAt(0)}</span>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                        {tabs.map((tab) => (
                            <TabsContent key={tab.value} value={tab.value} className="mt-6">
                                {tab.content}
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
                <NetworkSidebar />
            </div>
        </div>
    );
}
