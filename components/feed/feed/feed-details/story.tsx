"use client";

import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function Story({
  data,
  user,
  type,
}: {
  data: any;
  user: any;
  type: string;
}) {
  return (
    <div className="flex flex-col w-full p-4 gap-5 justify-center">
      {type !== "repost" && (
        <>
          <div className="flex flex-row items-center gap-3 h-8">
            <Avatar className="w-8 h-8" src={user?.avatar} alt={user?.firstName} />
            <span>
              <span className="font-bold">{user?.firstName} </span>
              posted this story
            </span>
          </div>
          <Separator />
        </>
      )}

      {/* <StoryPreview item={data} /> */}
    </div>
  );
}
