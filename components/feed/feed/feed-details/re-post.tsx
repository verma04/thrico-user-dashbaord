import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import FeedInfo from "./feed-Info";
import { getFeedDetailsById } from "@/components/grapqhl/action/feed";

interface RepostProps {
  id: string;
  user: { avatar: string; firstName: string };
  details: { description: string };
}

const Repost: React.FC<RepostProps> = ({ id, user, details }) => {
  const { data, loading, error } = getFeedDetailsById({
    variables: {
      input: {
        id: id,
      },
    },
  });

  return (
    <Card className="w-full p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://cdn.thrico.network/${user?.avatar}`} alt={user?.firstName} />
          <AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
        </Avatar>
        <span>
          <span className="font-bold">{user?.firstName} </span>
          reposted this
        </span>
      </div>
      <Separator />
      {details?.description && <div>{details.description}</div>}
      {!loading && (
        <div>
          <FeedInfo type="repost" item={data?.getFeedDetailsById} />
        </div>
      )}
    </Card>
  );
};

export default Repost;
