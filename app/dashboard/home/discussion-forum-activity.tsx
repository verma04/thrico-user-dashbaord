import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default function DiscussionForumActivity() {
  const discussions = [
    {
      title: "Best practices for remote work",
      author: "Sarah Wilson",
      replies: 23,
      lastReply: "Just replied by John Doe",
      time: "5 minutes ago",
      category: "General",
      isHot: true,
    },
    {
      title: "AI tools for developers in 2025",
      author: "Mike Johnson",
      replies: 18,
      lastReply: "New comment by Lisa Chen",
      time: "15 minutes ago",
      category: "Technology",
      isHot: false,
    },
    {
      title: "Career transition advice needed",
      author: "Emily Davis",
      replies: 31,
      lastReply: "Helpful tip by Robert Kim",
      time: "1 hour ago",
      category: "Career",
      isHot: true,
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-lg sm:text-xl">
            Discussion Forum Activity
          </CardTitle>
          <Link href="/dashboard/discussions">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              View Forums
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {discussions.map((discussion, index) => (
          <div key={index} className="border rounded-lg p-3 sm:p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-sm sm:text-base truncate">
                    {discussion.title}
                  </h4>
                  {discussion.isHot && (
                    <Badge variant="destructive" className="text-xs">
                      Hot
                    </Badge>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  by {discussion.author}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs sm:text-sm">
                  <span className="text-blue-600">
                    {discussion.replies} replies
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {discussion.category}
                  </Badge>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  {discussion.lastReply}
                </p>
                <p className="text-xs text-gray-500">{discussion.time}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}