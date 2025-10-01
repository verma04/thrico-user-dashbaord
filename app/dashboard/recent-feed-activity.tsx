import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function RecentFeedActivity() {
  const activities = [
    {
      type: "comment",
      author: "Alex Chen",
      action: "commented on your post",
      content:
        "Great insights on team collaboration! I've implemented similar strategies in my team.",
      time: "15 minutes ago",
      postTitle: "Remote Team Management Tips",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      type: "like",
      author: "Maria Garcia",
      action: "liked your discussion",
      content: "",
      time: "1 hour ago",
      postTitle: "AI in Healthcare: Future Prospects",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      type: "comment",
      author: "David Kim",
      action: "replied to your comment",
      content:
        "I agree! Have you tried the new project management tool I mentioned?",
      time: "2 hours ago",
      postTitle: "Best Tools for Productivity",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-lg sm:text-xl">
            Recent Feed Activity
          </CardTitle>
          <Link href="/dashboard/feed">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="border rounded-lg p-3 sm:p-4 bg-gray-50"
          >
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                <AvatarImage src={activity.avatar} alt={activity.author} />
                <AvatarFallback className="text-xs sm:text-sm">
                  {activity.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-sm sm:text-base">
                    {activity.author}
                  </h4>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {activity.action}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-blue-600 mb-1">
                  "{activity.postTitle}"
                </p>
                {activity.content && (
                  <p className="text-gray-700 text-sm bg-white p-2 rounded border-l-2 border-blue-200">
                    {activity.content}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}