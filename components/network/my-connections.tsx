"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MessageCircle, 
  MoreVertical, 
  Users, 
  MapPin, 
  Calendar,
  Filter,
  Star,
  Phone,
  Video,
  Shield,
  Flag
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserProfileModal } from "./user-profile-modal";

interface Connection {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  bio?: string;
  location?: string;
  company?: string;
  position?: string;
  education?: string;
  skills?: string[];
  connectedSince: string;
  mutualFriends: number;
  lastSeen?: string;
  isClose: boolean;
  unreadMessages: number;
  isBlocked: boolean;
  isReported: boolean;
  totalConnections: number;
  joinedDate: string;
  isPending: boolean;
  isConnected: boolean;
}

export function MyConnections() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<Connection | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "1",
      name: "John Smith",
      avatar: "/placeholder-user.jpg",
      status: "online",
      bio: "Senior Software Engineer at Google",
      location: "Mountain View, CA",
      company: "Google",
      position: "Senior Software Engineer",
      education: "Stanford University",
      skills: ["JavaScript", "React", "Node.js", "Python"],
      connectedSince: "2023-01-15",
      mutualFriends: 18,
      isClose: true,
      unreadMessages: 3,
      isBlocked: false,
      isReported: false,
      totalConnections: 342,
      joinedDate: "2022-08-15",
      isPending: false,
      isConnected: true
    },
    {
      id: "2",
      name: "Maria Garcia",
      avatar: "/placeholder-user.jpg",
      status: "away",
      bio: "Product Manager | Startup Enthusiast",
      location: "San Francisco, CA",
      company: "Tech Startup Inc.",
      position: "Senior Product Manager",
      education: "UC Berkeley",
      skills: ["Product Management", "Strategy", "Analytics", "Agile"],
      connectedSince: "2023-03-22",
      mutualFriends: 12,
      isClose: false,
      unreadMessages: 0,
      isBlocked: false,
      isReported: false,
      totalConnections: 278,
      joinedDate: "2022-11-10",
      isPending: false,
      isConnected: true
    },
    {
      id: "3",
      name: "Alex Johnson",
      avatar: "/placeholder-user.jpg",
      status: "online",
      bio: "UX Designer passionate about accessibility",
      location: "Seattle, WA",
      company: "Microsoft",
      position: "Senior UX Designer",
      education: "Art Center College of Design",
      skills: ["UX Design", "Accessibility", "Figma", "User Research"],
      connectedSince: "2022-11-08",
      mutualFriends: 25,
      isClose: true,
      unreadMessages: 1,
      isBlocked: false,
      isReported: false,
      totalConnections: 198,
      joinedDate: "2022-06-20",
      isPending: false,
      isConnected: true
    },
    {
      id: "4",
      name: "Emily Chen",
      avatar: "/placeholder-user.jpg",
      status: "offline",
      bio: "Data Scientist | ML Engineer",
      location: "New York, NY",
      company: "Netflix",
      position: "Senior Data Scientist",
      education: "MIT",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
      connectedSince: "2023-05-10",
      mutualFriends: 8,
      lastSeen: "2 hours ago",
      isClose: false,
      unreadMessages: 0,
      isBlocked: false,
      isReported: false,
      totalConnections: 156,
      joinedDate: "2023-01-05",
      isPending: false,
      isConnected: true
    },
    {
      id: "5",
      name: "Ryan Williams",
      avatar: "/placeholder-user.jpg",
      status: "online",
      bio: "DevOps Engineer | Cloud Architecture",
      location: "Austin, TX",
      company: "Amazon",
      position: "DevOps Engineer",
      education: "University of Texas at Austin",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      connectedSince: "2023-02-28",
      mutualFriends: 15,
      isClose: false,
      unreadMessages: 0,
      isBlocked: false,
      isReported: false,
      totalConnections: 223,
      joinedDate: "2022-09-12",
      isPending: false,
      isConnected: true
    },
    {
      id: "6",
      name: "Sophie Turner",
      avatar: "/placeholder-user.jpg",
      status: "away",
      bio: "Marketing Director | Content Strategy",
      location: "Los Angeles, CA",
      company: "Creative Agency",
      position: "Marketing Director",
      education: "UCLA",
      skills: ["Digital Marketing", "Content Strategy", "SEO", "Social Media"],
      connectedSince: "2022-12-05",
      mutualFriends: 20,
      isClose: true,
      unreadMessages: 2,
      isBlocked: false,
      isReported: false,
      totalConnections: 387,
      joinedDate: "2022-05-08",
      isPending: false,
      isConnected: true
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      default: return "bg-gray-400";
    }
  };

  const handleBlock = (userId: string) => {
    setConnections(connections.map(user => 
      user.id === userId 
        ? { ...user, isBlocked: true }
        : user
    ));
    // TODO: Add API call to block user
    const user = connections.find(u => u.id === userId);
    console.log(`${user?.name} has been blocked and removed from your network.`);
  };

  const handleReport = (userId: string) => {
    setConnections(connections.map(user => 
      user.id === userId 
        ? { ...user, isReported: true }
        : user
    ));
    // TODO: Add API call to report user
    const user = connections.find(u => u.id === userId);
    console.log(`${user?.name} has been reported. Thank you for helping keep our community safe.`);
  };

  const handleViewProfile = (user: Connection) => {
    const profileData = {
      ...user,
      recentActivity: [
        {
          type: "post" as const,
          title: "Shared insights on team collaboration",
          date: "1 day ago"
        },
        {
          type: "community" as const,
          title: "Joined Tech Professionals group",
          date: "3 days ago"
        }
      ],
      achievements: [
        {
          title: "Active Contributor",
          icon: "🌟",
          date: "This week"
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
    // This shouldn't be used in connections, but added for compatibility
    console.log(`User ${userId} is already connected`);
  };

  const filteredConnections = connections.filter(connection => {
    // Don't show blocked users
    if (connection.isBlocked) return false;
    
    const matchesSearch = connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filter) {
      case "online":
        return matchesSearch && connection.status === "online";
      case "close":
        return matchesSearch && connection.isClose;
      case "recent":
        return matchesSearch && new Date(connection.connectedSince) > new Date('2023-01-01');
      default:
        return matchesSearch;
    }
  });

  const totalUnreadMessages = connections.reduce((sum, conn) => sum + conn.unreadMessages, 0);
  const onlineCount = connections.filter(conn => conn.status === "online").length;
  const closeConnectionsCount = connections.filter(conn => conn.isClose).length;

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{connections.length}</div>
            <div className="text-sm text-gray-600">Total Connections</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{onlineCount}</div>
            <div className="text-sm text-gray-600">Online Now</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{closeConnectionsCount}</div>
            <div className="text-sm text-gray-600">Close Friends</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search your connections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="sm:w-48">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Connections</SelectItem>
                  <SelectItem value="online">Online Now</SelectItem>
                  <SelectItem value="close">Close Friends</SelectItem>
                  <SelectItem value="recent">Recent Connections</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {totalUnreadMessages > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-800">
                You have {totalUnreadMessages} unread messages from your network
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Connections List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            My Network ({filteredConnections.length})
          </h3>
        </div>
        
        {filteredConnections.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Connections Found</h3>
              <p className="text-gray-500 text-center">Try adjusting your search terms or filters.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredConnections.map((connection) => (
              <div
                key={connection.id}
                className="flex items-center space-x-3 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div 
                  className="relative cursor-pointer"
                  onClick={() => handleViewProfile(connection)}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={connection.avatar || "/placeholder-user.jpg"} alt={connection.name} />
                    <AvatarFallback>
                      {connection.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(connection.status)}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 
                      className="font-semibold text-base truncate cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => handleViewProfile(connection)}
                    >
                      {connection.name}
                    </h4>
                    {connection.isClose && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                    {connection.isReported && (
                      <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                        Reported
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 truncate">
                    {connection.bio || "No bio"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {connection.location && (
                      <span className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {connection.location}
                      </span>
                    )}
                    <span className="flex items-center text-xs text-gray-500">
                      <Users className="h-3 w-3 mr-1" />
                      {connection.mutualFriends} mutual friends
                    </span>
                  </div>
                  {connection.status === "offline" && connection.lastSeen && (
                    <p className="text-xs text-gray-400 mt-1">Last seen {connection.lastSeen}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="whitespace-nowrap"
                    onClick={() => handleMessage(connection.id)}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                    {connection.unreadMessages > 0 && (
                      <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                        {connection.unreadMessages}
                      </Badge>
                    )}
                  </Button>
                  
                  {/* Action Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleViewProfile(connection)}>
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCall(connection.id)}>
                        <Phone className="mr-2 h-4 w-4" />
                        Voice Call
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleVideoCall(connection.id)}>
                        <Video className="mr-2 h-4 w-4" />
                        Video Call
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        {connection.isClose ? "Remove from Close Friends" : "Add to Close Friends"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleBlock(connection.id)}
                        className="text-orange-600"
                        disabled={connection.isBlocked}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        {connection.isBlocked ? "Blocked" : "Block User"}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleReport(connection.id)}
                        className="text-red-600"
                        disabled={connection.isReported}
                      >
                        <Flag className="mr-2 h-4 w-4" />
                        {connection.isReported ? "Reported" : "Report User"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Remove Connection
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
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
