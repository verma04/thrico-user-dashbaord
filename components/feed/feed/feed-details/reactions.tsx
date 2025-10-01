"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThumbsUp, Star, Heart, Lightbulb, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import { likeFeed } from "@/components/grapqhl/action/feed";

const reactions = [
  { icon: ThumbsUp, color: "#4267B2" },
  { icon: Star, color: "#45BD62" },
  { icon: Heart, color: "#ED4956" },
  { icon: Lightbulb, color: "#F7B928" },
  { icon: Smile, color: "#6CC1E3" },
];

export default function ReactionButton({
  likeUpdate,
  value,
  item,
}: {
  likeUpdate: () => void;
  value: { isLiked: boolean };
  item: { id: string };
}) {
  const [open, setOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<{
    icon: any;
    color: string;
  } | null>(null);

  const handleReactionSelect = (reaction: { icon: any; color: string }) => {
    setSelectedReaction(reaction);
    setOpen(false);
    // Optionally call likeUpdate or mutation here
  };

  const [like] = likeFeed({});

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => {
            likeUpdate();
            // Call your likeFeed mutation here if needed
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          className={cn(
            "flex items-center gap-2",
            value?.isLiked && "text-primary"
          )}
        >
          <Heart
            size={20}
            color={value?.isLiked ? "var(--primary)" : "#8c8c8c"}
            fill={value?.isLiked ? "var(--primary)" : "none"}
          />
          Like
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex gap-2 p-2 rounded-2xl bg-white shadow-lg">
        {reactions.map((reaction, idx) => {
          const Icon = reaction.icon;
          return (
            <button
              key={idx}
              type="button"
              className="p-1 hover:bg-gray-100 rounded-full"
              onClick={() => handleReactionSelect(reaction)}
            >
              <Icon size={30} color={reaction.color} />
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
