"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function AnalyticsPage() {
  const recentActivity = [
    { action: "New member joined", user: "Emma Thompson", time: "2 hours ago" },
    { action: "Post approved", user: "David Rodriguez", time: "4 hours ago" },
    { action: "Member promoted to co-admin", user: "Sarah Wilson", time: "1 day ago" },
    { action: "Community rules updated", user: "You", time: "2 days ago" },
    { action: "New join request", user: "Lisa Chen", time: "3 days ago" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Member Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">+23</div>
            <p className="text-sm text-gray-600">New members this week</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-green-600 rounded-full" style={{ width: "75%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Post Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">47</div>
            <p className="text-sm text-gray-600">Posts this week</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: "60%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <div className="text-3xl font-bold text-yellow-600 mr-2">4.8</div>
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-sm text-gray-600">Average rating (156 reviews)</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-yellow-600 rounded-full" style={{ width: "96%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
