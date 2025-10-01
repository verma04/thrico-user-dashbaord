import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import Link from "next/link";

export default function MyCommunitiesActivity() {
  const communities = [
    {
      name: "Full Stack Developers",
      members: 1247,
      activity: "12 new posts today",
      lastActive: "2 minutes ago",
      role: "Admin",
      newCount: 5,
      color: "bg-blue-500",
    },
    {
      name: "UI/UX Designers Hub",
      members: 856,
      activity: "8 new discussions",
      lastActive: "1 hour ago",
      role: "Member",
      newCount: 3,
      color: "bg-purple-500",
    },
    {
      name: "Startup Founders Network",
      members: 432,
      activity: "New event posted",
      lastActive: "3 hours ago",
      role: "Moderator",
      newCount: 1,
      color: "bg-green-500",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-lg sm:text-xl">
            My Communities Activity
          </CardTitle>
          <Link href="/dashboard/communities">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              Manage All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {communities.map((community, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 sm:p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 ${community.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-sm sm:text-base truncate">
                      {community.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {community.role}
                    </Badge>
                    {community.newCount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {community.newCount}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {community.members} members
                  </p>
                  <p className="text-xs text-blue-600">{community.activity}</p>
                  <p className="text-xs text-gray-500">
                    Last active: {community.lastActive}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}