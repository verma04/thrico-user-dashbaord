"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Star,
  TrendingUp,
  MoreVertical,
  Bookmark,
  Share2,
  Users,
  Heart,
  Eye,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { ApplyJobModal } from "./apply-job-modal";
import Image from "next/image";

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  attendees: number;
  likes: number;
  views: number;
  category: string;
  creator: {
    name: string;
    avatar: string;
    role: string;
  };
  price: string;
  status: string;
  isSaved?: boolean;
}

interface EventsCardProps {
  event: Event;
}

export function EventsCard({ event }: EventsCardProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isEventSaved, setIsEventSaved] = useState(event.isSaved || false); // Local state for saved status

  const handleSaveToggle = () => {
    setIsEventSaved((prev) => !prev);
    // In a real application, you would send an API request here to update the saved status
    console.log(`Event ${event.id} ${isEventSaved ? "unsaved" : "saved"}`);
  };

  return (
    <>
      <Card
        key={event.id}
        className="overflow-hidden hover:shadow-lg transition-shadow pt-0"
      >
        <div className="relative aspect-video">
          <Image
            src={"https://cdn.thrico.network/defaultEventCover.png"}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-background/80 backdrop-blur"
            >
              {event.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {event.description}
              </p>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={event.creator.avatar || "/placeholder.svg"}
                    alt={event.creator.name}
                  />
                  <AvatarFallback>
                    {event.creator.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs">
                  <p className="font-medium">{event.creator.name}</p>
                  <p className="text-muted-foreground">{event.creator.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">{event.price}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{event.attendees.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  <span>{event.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{event.views.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Link href={`/events/${event.id}/details`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </Link>
              <Button size="sm" className="flex-1">
                Join Event
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
