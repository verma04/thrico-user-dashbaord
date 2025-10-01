import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { FileQuestion, MessageSquare, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeed, getMyFeed } from "@/components/grapqhl/action/feed";
import Feed from "@/components/feed/feed/feed-card";

interface Activity {
  type: "post" | "event" | "discussion";
  action: string;
  time: string;
  engagement: string;
}

const activityIcons = {
  post: MessageSquare,
  event: Calendar,
  discussion: Users,
};

const RecentActivity = ({ activities }: { activities: Activity[] }) => {
  const { data } = getMyFeed({
    variables: {
      input: {
        offset: 0,
        limit: 1,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const posts = data?.getMyFeed || [];
  return (
    <>
      {posts.map((post: any, idx: number) => (
        <Feed item={post} key={idx} />
      ))}
    </>
  );
};

export default RecentActivity;
