"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Repeat, Pencil } from "lucide-react";
import { toast } from "sonner";

type ReShareProps = {
  item: { id: string };
};

export default function ReShare({ item }: ReShareProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleRepost = async () => {
    // Replace with your repost logic
    // await repostFeedWithThought({ ... });
    toast.success("Feed Added");
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost"  className="flex items-center gap-2 text-muted-foreground" >
          <Repeat size={20}  />
          Share
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl border border-gray-200 p-6 space-y-4">
        <div className="space-y-3">
          <button
            className="w-full flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 p-4"
            onClick={() => {
              setOpen(false);
              router.push(`/repost-feed?item=${encodeURIComponent(JSON.stringify(item))}`);
            }}
          >
            <Avatar className="bg-indigo-100">
              <Pencil className="text-indigo-500" />
            </Avatar>
            <div className="text-left">
              <div className="font-bold text-base text-gray-900">Repost with your thoughts</div>
              <div className="text-sm text-gray-500">Create a new post with post attached</div>
            </div>
          </button>
          <button
            className="w-full flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 p-4"
            onClick={handleRepost}
          >
            <Avatar className="bg-indigo-100">
              <Repeat className="text-indigo-500" />
            </Avatar>
            <div className="text-left">
              <div className="font-bold text-base text-gray-900">Repost</div>
              <div className="text-sm text-gray-500">Instantly bring post to other's feeds</div>
            </div>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
