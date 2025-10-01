import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function LatestNewsNotifications() {
  const notifications = [
    {
      type: "news",
      title: "New Feature: AI Writing Assistant",
      content:
        "We've launched an AI-powered writing assistant to help you create better posts.",
      time: "2 hours ago",
      isNew: true,
    },
    {
      type: "notification",
      title: "Community Guidelines Updated",
      content:
        "Please review the updated community guidelines for better engagement.",
      time: "1 day ago",
      isNew: false,
    },
    {
      type: "news",
      title: "Platform Maintenance Scheduled",
      content:
        "Scheduled maintenance on Aug 15, 2025 from 2:00 AM - 4:00 AM PST.",
      time: "2 days ago",
      isNew: false,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Latest News & Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      notification.type === "news"
                        ? "bg-blue-500"
                        : "bg-orange-500"
                    }`}
                  ></div>
                  <Badge variant="outline" className="text-xs">
                    {notification.type}
                  </Badge>
                  {notification.isNew && (
                    <Badge variant="destructive" className="text-xs">
                      New
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {notification.time}
                </span>
              </div>
              <h4 className="font-medium text-sm mb-1">
                {notification.title}
              </h4>
              <p className="text-xs text-gray-600">{notification.content}</p>
            </div>
          ))}
        </div>
        <Link href="/dashboard/notifications">
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-4 bg-transparent"
          >
            View All Notifications
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}