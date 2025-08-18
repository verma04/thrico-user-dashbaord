"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DiscussionsPage() {
  const recentPosts = [
    {
      title: "Amazing sunset photography tips",
      author: "Alex Johnson",
      time: "2 hours ago",
      status: "approved",
    },
    {
      title: "Weekly photography challenge",
      author: "Sarah Wilson",
      time: "1 day ago",
      status: "approved",
    },
    {
      title: "New camera gear recommendations",
      author: "Mike Chen",
      time: "2 days ago",
      status: "pending",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Discussion Management</CardTitle>
          <CardDescription>Manage posts and discussions in your community.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">47</div>
                <p className="text-sm text-gray-600">Posts this week</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">156</div>
                <p className="text-sm text-gray-600">Comments this week</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <p className="text-sm text-gray-600">Posts pending approval</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Recent Posts</h4>
              {recentPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h5 className="font-medium">{post.title}</h5>
                    <p className="text-sm text-gray-600">
                      by {post.author} • {post.time}
                    </p>
                  </div>
                  <Badge variant={post.status === "approved" ? "default" : "secondary"}>{post.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
