"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock, Users, MapPin, MoreVertical, Shield, Flag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserProfileModal } from "./user-profile-modal";

interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
  requestTime: string;
  bio?: string;
  location?: string;
  company?: string;
  position?: string;
  education?: string;
  skills?: string[];
  status: "online" | "offline" | "away";
  totalConnections: number;
  joinedDate: string;
  isBlocked: boolean;
  isReported: boolean;
  isPending: boolean;
  isConnected: boolean;
  isClose: boolean;
}

export function FriendRequests() {
  const [selectedUser, setSelectedUser] = useState<FriendRequest | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [requests, setRequests] = useState<FriendRequest[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      mutualFriends: 12,
      requestTime: "2 hours ago",
      bio: "Software Engineer passionate about building scalable applications",
      location: "San Francisco, CA",
      company: "TechCorp",
      position: "Senior Software Engineer",
      education: "Stanford University",
      skills: ["JavaScript", "React", "Node.js", "Python"],
      status: "online",
      totalConnections: 234,
      joinedDate: "2022-05-15",
      isBlocked: false,
      isReported: false,
      isPending: true,
      isConnected: false,
      isClose: false
    },
    {
      id: "2",
      name: "Mike Chen",
      avatar: "/placeholder-user.jpg",
      mutualFriends: 5,
      requestTime: "1 day ago",
      bio: "Digital Marketing Specialist focused on growth strategies",
      location: "New York, NY",
      company: "Marketing Pro",
      position: "Digital Marketing Specialist",
      education: "NYU",
      skills: ["Digital Marketing", "SEO", "Analytics", "Content Strategy"],
      status: "away",
      totalConnections: 156,
      joinedDate: "2023-01-10",
      isBlocked: false,
      isReported: false,
      isPending: true,
      isConnected: false,
      isClose: false
    },
    {
      id: "3",
      name: "Emma Wilson",
      avatar: "/placeholder-user.jpg",
      mutualFriends: 8,
      requestTime: "3 days ago",
      bio: "UX Designer creating intuitive user experiences",
      location: "Austin, TX",
      company: "Design Hub",
      position: "UX Designer",
      education: "University of Texas",
      skills: ["UX Design", "Figma", "User Research", "Prototyping"],
      status: "online",
      totalConnections: 198,
      joinedDate: "2022-09-20",
      isBlocked: false,
      isReported: false,
      isPending: true,
      isConnected: false,
      isClose: false
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      avatar: "/placeholder-user.jpg",
      mutualFriends: 3,
      requestTime: "1 week ago",
      bio: "Product Manager driving innovation in tech",
      location: "Seattle, WA",
      company: "Innovation Labs",
      position: "Product Manager",
      education: "University of Washington",
      skills: ["Product Management", "Strategy", "Analytics", "Agile"],
      status: "offline",
      totalConnections: 145,
      joinedDate: "2023-03-05",
      isBlocked: false,
      isReported: false,
      isPending: true,
      isConnected: false,
      isClose: false
    }
  ]);

  const handleAccept = (requestId: string) => {
    setRequests(requests.filter(req => req.id !== requestId));
    // TODO: Add API call to accept friend request
  };

  const handleDecline = (requestId: string) => {
    setRequests(requests.filter(req => req.id !== requestId));
    // TODO: Add API call to decline friend request
  };

  const handleBlock = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, isBlocked: true }
        : req
    ));
    // TODO: Add API call to block user
    const user = requests.find(r => r.id === requestId);
    console.log(`${user?.name} has been blocked and will no longer appear in your requests.`);
  };

  const handleReport = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, isReported: true }
        : req
    ));
    // TODO: Add API call to report user
    const user = requests.find(r => r.id === requestId);
    console.log(`${user?.name} has been reported. Thank you for helping keep our community safe.`);
  };

  const handleViewProfile = (user: FriendRequest) => {
    const profileData = {
      ...user,
      recentActivity: [
        {
          type: "post" as const,
          title: "Looking forward to connecting with new professionals",
          date: "1 day ago"
        }
      ],
      achievements: [
        {
          title: "New Member",
          icon: "🌟",
          date: "Recently joined"
        }
      ]
    };
    setSelectedUser(profileData);
    setIsProfileModalOpen(true);
  };

  const handleMessage = (userId: string) => {
    // TODO: Implement messaging functionality
    console.log(`Starting conversation with user ${userId}`);
  };

  const handleCall = (userId: string) => {
    // TODO: Implement call functionality
    console.log(`Calling user ${userId}`);
  };

  const handleVideoCall = (userId: string) => {
    // TODO: Implement video call functionality
    console.log(`Starting video call with user ${userId}`);
  };

  const handleConnect = (userId: string) => {
    // This is the same as accept in friend requests context
    handleAccept(userId);
  };

  // Filter out blocked users
  const filteredRequests = requests.filter(req => !req.isBlocked);

  if (filteredRequests.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Friend Requests</h3>
          <p className="text-gray-500 text-center">You're all caught up! No pending friend requests at the moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-900">
          Friend Requests ({filteredRequests.length})
        </h2>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {filteredRequests.length} pending
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-3 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div 
              className="relative cursor-pointer"
              onClick={() => handleViewProfile(request)}
            >
              <Avatar className="h-14 w-14 sm:h-12 sm:w-12">
                <AvatarImage src={request.avatar || "/placeholder-user.jpg"} alt={request.name} />
                <AvatarFallback>
                  {request.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {/* Status Indicator */}
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                request.status === 'online' ? 'bg-green-500' : 
                request.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
              }`}></div>
            </div>
            
            <div className="flex-1 min-w-0 w-full">
              <div className="flex items-center gap-2">
                <h4 
                  className="font-semibold text-base truncate cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleViewProfile(request)}
                >
                  {request.name}
                </h4>
                {request.isReported && (
                  <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                    Reported
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-600 truncate">
                {request.bio || "No bio"}{request.company ? ` at ${request.company}` : ""}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {request.location && (
                  <span className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {request.location}
                  </span>
                )}
                <span className="flex items-center text-xs text-gray-500">
                  <Users className="h-3 w-3 mr-1" />
                  {request.mutualFriends} mutual friends
                </span>
                <span className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {request.requestTime}
                </span>
              </div>
            </div>
            
            <div className="flex flex-row sm:flex-col items-center gap-2 mt-2 sm:mt-0">
              <Button 
                onClick={() => handleAccept(request.id)}
                size="sm" 
                className="w-20 text-xs sm:text-sm"
              >
                <Check className="h-4 w-4 mr-1" />
                Accept
              </Button>
              <Button 
                onClick={() => handleDecline(request.id)}
                variant="outline" 
                size="sm" 
                className="w-20 text-xs sm:text-sm"
              >
                <X className="h-4 w-4 mr-1" />
                Decline
              </Button>
              {/* Action Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => handleViewProfile(request)}>
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleBlock(request.id)}
                    className="text-orange-600"
                    disabled={request.isBlocked}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    {request.isBlocked ? "Blocked" : "Block User"}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleReport(request.id)}
                    className="text-red-600"
                    disabled={request.isReported}
                  >
                    <Flag className="mr-2 h-4 w-4" />
                    {request.isReported ? "Reported" : "Report User"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
      
      {/* Profile Modal */}
      <UserProfileModal
        user={selectedUser}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onConnect={handleConnect}
        onMessage={handleMessage}
        onCall={handleCall}
        onVideoCall={handleVideoCall}
      />
    </div>
  );
}
