import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faker } from '@faker-js/faker';
import { Button } from "@/components/ui/button";
import {
 
  UserPlus,
  MoreVertical,
  Shield,
  Flag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Suggestion {
  id: string;
  name: string;
  avatar: string;
  coverImage: string; // Now required
  mutualFriends: number;
  bio?: string;
  location?: string;
  company?: string;
  isConnected: boolean;
  isPending: boolean;
  isBlocked: boolean;
  isReported: boolean;
  status: "online" | "offline" | "away";
}

interface NetworkCardProps {
  person: Suggestion;
  onConnect: (userId: string) => void;
  onBlock: (userId: string) => void;
  onReport: (userId: string) => void;
  onViewProfile: (person: Suggestion) => void;
}

export function NetworkCard({
  person,
  onConnect,
  onBlock,
  onReport,
  onViewProfile,
}: NetworkCardProps) {
  return (
    <>
      <div className="relative w-50 rounded-lg border bg-white shadow hover:shadow-md transition-shadow overflow-hidden">
        {/* Cover Image */}
        <div className="h-20 w-full relative">
          <img
            src={faker.image.urlPicsumPhotos()} // Using faker to generate a random nature image
            alt="cover"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Avatar */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <Avatar className="h-16 w-16 border-2 border-white shadow">
            <AvatarImage src={faker.image.avatarGitHub()} alt={person.name} />
            <AvatarFallback>
              {person.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Details */}
        <div className="flex flex-col items-center mt-10 px-4 pb-4">
          <h4 className="font-semibold text-sm">{person.name}</h4>
          <p className="text-xs text-gray-500 truncate text-center" title={person.bio || "Software Developer"}>
            {(person.bio && person.bio.length > 28)
              ? person.bio.slice(0, 28) + "..."
              : person.bio || "Software Developer"}
          </p>

          <Button
            size="sm"
            variant={person.isPending ? "outline" : "default"}
            disabled={person.isPending || person.isConnected}
            onClick={() => onConnect(person.id)}
            className="whitespace-nowrap mt-3 w-full flex justify-center items-center"
          >
            {person.isConnected ? (
              "Connected"
            ) : person.isPending ? (
              "Request Sent"
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-1" />
                Connect
              </>
            )}
          </Button>
        </div>

        <div className="absolute top-2 right-2">
          {/* Action Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4 color-white" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => onBlock(person.id)}
                className="text-orange-600"
                disabled={person.isBlocked}
              >
                <Shield className="mr-2 h-4 w-4" />
                {person.isBlocked ? "Blocked" : "Block User"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onReport(person.id)}
                className="text-red-600"
                disabled={person.isReported}
              >
                <Flag className="mr-2 h-4 w-4" />
                {person.isReported ? "Reported" : "Report User"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
