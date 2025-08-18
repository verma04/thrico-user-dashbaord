"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Users, MessageSquare, Heart, BarChart2, Search, UserCheck } from "lucide-react"
import { useState } from "react"

// Mock data for sidebar components
const networkStats = [
  { label: "Total Connections", value: "1,234" },
  { label: "New This Week", value: "23" },
  { label: "Pending Requests", value: "7" },
  { label: "Mutual Friends", value: "456" },
]

const popularConnections = [
  { name: "Tech Professionals", count: 234, color: "bg-blue-500" },
  { name: "Designers", count: 156, color: "bg-green-500" },
  { name: "Marketing Experts", count: 123, color: "bg-purple-500" },
  { name: "Sales Professionals", count: 89, color: "bg-orange-500" },
  { name: "HR Specialists", count: 67, color: "bg-red-500" },
]

export function NetworkSidebar() {
  return (
    <div className="space-y-6">
      {/* Network Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Network Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {networkStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <span className="font-semibold">{stat.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <UserPlus className="w-4 h-4 mr-2" />
              Find New Friends
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Users className="w-4 h-4 mr-2" />
              View My Network
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <UserCheck className="w-4 h-4 mr-2" />
              Manage Requests
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Search className="w-4 h-4 mr-2" />
              Advanced Search
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <BarChart2 className="w-4 h-4 mr-2" />
              Network Analytics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Connections Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {popularConnections.map((connection, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${connection.color} rounded-full`}></div>
                  <span className="text-sm">{connection.name}</span>
                </div>
                <span className="text-sm text-gray-500">{connection.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <UserPlus className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Sarah connected with you</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New message from Mike</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John liked your post</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
