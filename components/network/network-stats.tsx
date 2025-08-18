"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, MessageCircle, Calendar } from "lucide-react";

export function NetworkStats() {
  const stats = [
    {
      title: "Total Connections",
      value: "247",
      icon: Users,
      description: "Active connections",
      trend: "+12 this month"
    },
    {
      title: "Pending Requests",
      value: "8",
      icon: UserPlus,
      description: "Friend requests",
      trend: "3 new today"
    },
    {
      title: "Recent Messages",
      value: "15",
      icon: MessageCircle,
      description: "Unread messages",
      trend: "From 8 friends"
    },
    {
      title: "Upcoming Events",
      value: "4",
      icon: Calendar,
      description: "With friends",
      trend: "This week"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
            <div className="text-xs text-blue-600 mt-1 font-medium">{stat.trend}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
