"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Users, MapPin, Briefcase, Filter, MoreVertical, Shield, Flag, SortAsc } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserProfileModal } from "./user-profile-modal";

interface Suggestion {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
  bio?: string;
  location?: string;
  company?: string;
  position?: string;
  education?: string;
  skills?: string[];
  isConnected: boolean; 
  isPending: boolean;
  isBlocked: boolean;
  isReported: boolean;
  joinedDate: string;
  totalConnections: number;
  status: "online" | "offline" | "away";
  isClose: boolean;
}

export function FindFriends() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  const [selectedUser, setSelectedUser] = useState<Suggestion | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: "1",
      name: "Jennifer Davis",
      avatar: "/placeholder-user.jpg",
      mutualFriends: 15,
      bio: "Product Designer passionate about user experience",
      location: "Los Angeles, CA",
      company: "Design Studio Inc.",
      position: "Senior Product Designer",
      education: "Stanford University",
      skills: ["UI/UX Design", "Figma", "Prototyping", "User Research"],
      isConnected: false,
      isPending: false,
      isBlocked: false,
      isReported: false,
      joinedDate: "2023-01-15",
      totalConnections: 245,
      status: "online",
      isClose: false
    },
    {
      id: "2",
      name: "Robert Kim",
      avatar: "/placeholder-user.jpg",
      mutualFriends: 8,
      bio: "Full Stack Developer | Tech Enthusiast",
      location: "Portland, OR",
      company: "TechFlow Solutions",
      position: "Senior Full Stack Developer",
      education: "University of Washington",
      skills: ["React", "Node.js", "TypeScript", "Python"],
      isConnected: false,
      isPending: false,
      isBlocked: false,
      isReported: false,
      joinedDate: "2023-03-22",
      totalConnections: 180,
      status: "away",
      isClose: false
    },
    {
      id: "3",
      name: "Lisa Thompson",
      avatar: "/placeholder-user.jpg",
      mutualFriends: 22,
      bio: "Marketing Manager | Content Creator",
      location: "Miami, FL",
      company: "Creative Agency",
      position: "Senior Marketing Manager",
      education: "University of Miami",
      skills: ["Digital Marketing", "Content Strategy", "Social Media", "Analytics"],
      isConnected: false,
      isPending: false,
      isBlocked: false,
      isReported: false,
      joinedDate: "2022-11-08",
      totalConnections: 320,
      status: "online",
      isClose: false
    },
    {
      id: "4",
      name: "David Martinez",
      avatar: "/placeholder-user.jpg",
      mutualFriends: 6,
      bio: "Data Scientist | AI Researcher",
      location: "Boston, MA",
      company: "DataTech Labs",
      position: "Senior Data Scientist",
      education: "MIT",
      skills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow"],
      isConnected: false,
      isPending: false,
      isBlocked: false,
      isReported: false,
      joinedDate: "2023-05-10",
      totalConnections: 156,
      status: "offline",
      isClose: false
    },
    {
      id: "5",
      name: "Amanda Foster",
      avatar: "/placeholder-user.jpg",
      mutualFriends: 11,
      bio: "Business Analyst | Strategy Consultant",
      location: "Chicago, IL",
      company: "Business Solutions Corp",
      position: "Senior Business Analyst",
      education: "Northwestern University",
      skills: ["Business Analysis", "Strategy", "Consulting", "Project Management"],
      isConnected: false,
      isPending: false,
      isBlocked: false,
      isReported: false,
      joinedDate: "2023-02-18",
      totalConnections: 198,
      status: "away",
      isClose: false
    },
    {
      id: "6",
      name: "Chris Taylor",
      avatar: "/placeholder-user.jpg",
      mutualFriends: 4,
      bio: "Software Engineer | Open Source Contributor",
      location: "Denver, CO",
      company: "Code Innovations",
      position: "Software Engineer",
      education: "University of Colorado",
      skills: ["JavaScript", "Open Source", "Web Development", "DevOps"],
      isConnected: false,
      isPending: false,
      isBlocked: false,
      isReported: false,
      joinedDate: "2023-07-03",
      totalConnections: 89,
      status: "online",
      isClose: false
    }
  ]);

  const handleConnect = (userId: string) => {
    setSuggestions(suggestions.map(user => 
      user.id === userId 
        ? { ...user, isPending: true }
        : user
    ));
    // TODO: Add API call to send friend request
  };

  const handleBlock = (userId: string) => {
    setSuggestions(suggestions.map(user => 
      user.id === userId 
        ? { ...user, isBlocked: true }
        : user
    ));
    // TODO: Add API call to block user
    const user = suggestions.find(u => u.id === userId);
    console.log(`${user?.name} has been blocked and will no longer appear in your suggestions.`);
  };

  const handleReport = (userId: string) => {
    setSuggestions(suggestions.map(user => 
      user.id === userId 
        ? { ...user, isReported: true }
        : user
    ));
    // TODO: Add API call to report user
    const user = suggestions.find(u => u.id === userId);
    console.log(`${user?.name} has been reported. Thank you for helping keep our community safe.`);
  };

  const handleViewProfile = (user: Suggestion) => {
    const profileData = {
      ...user,
      recentActivity: [
        {
          type: "post" as const,
          title: "Shared thoughts on modern design systems",
          date: "2 days ago"
        },
        {
          type: "event" as const,
          title: "Attended UX Workshop",
          date: "1 week ago"
        }
      ],
      achievements: [
        {
          title: "Top Contributor",
          icon: "🏆",
          date: "This month"
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

  const filteredSuggestions = suggestions.filter(user => {
    // Don't show blocked users
    if (user.isBlocked) return false;
    
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "high-mutual") {
      return matchesSearch && user.mutualFriends >= 10;
    } else if (filter === "same-location") {
      // More flexible location matching
      const userLocation = user.location?.toLowerCase() || "";
      return matchesSearch && (userLocation.includes("ca") || userLocation.includes("california"));
    } else if (filter === "tech-industry") {
      const techKeywords = ["developer", "engineer", "tech", "software", "data", "ai", "ml"];
      const userBio = user.bio?.toLowerCase() || "";
      const userCompany = user.company?.toLowerCase() || "";
      return matchesSearch && techKeywords.some(keyword => 
        userBio.includes(keyword) || userCompany.includes(keyword)
      );
    } else if (filter === "connected") {
      return matchesSearch && user.isConnected;
    } else if (filter === "pending") {
      return matchesSearch && user.isPending;
    }
    
    return matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "mutual-high":
        return b.mutualFriends - a.mutualFriends;
      case "mutual-low":
        return a.mutualFriends - b.mutualFriends;
      case "location":
        return (a.location || "").localeCompare(b.location || "");
      case "company":
        return (a.company || "").localeCompare(b.company || "");
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Discover New Connections
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, location, company, or interests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="sm:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="mutual-high">Most Mutual Friends</SelectItem>
                    <SelectItem value="mutual-low">Least Mutual Friends</SelectItem>
                    <SelectItem value="location">Location (A-Z)</SelectItem>
                    <SelectItem value="company">Company (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Filter Badges */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <Badge 
                variant={filter === "all" ? "default" : "outline"}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setFilter("all")}
              >
                All People
              </Badge>
              <Badge 
                variant={filter === "high-mutual" ? "default" : "outline"}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setFilter("high-mutual")}
              >
                High Mutual (10+)
              </Badge>
              <Badge 
                variant={filter === "same-location" ? "default" : "outline"}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setFilter("same-location")}
              >
                Same Location
              </Badge>
              <Badge 
                variant={filter === "tech-industry" ? "default" : "outline"}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setFilter("tech-industry")}
              >
                Tech Industry
              </Badge>
              <Badge 
                variant={filter === "connected" ? "default" : "outline"}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setFilter("connected")}
              >
                Connected
              </Badge>
              <Badge 
                variant={filter === "pending" ? "default" : "outline"}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setFilter("pending")}
              >
                Pending
              </Badge>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Found {filteredSuggestions.length} people you might know
          </div>
        </CardContent>
      </Card>

      {/* People You Might Know */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">People You Might Know</h3>
      
      {filteredSuggestions.length === 0 ? (
        <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
          <p className="text-gray-500 text-center">Try adjusting your search terms or filters.</p>
        </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredSuggestions.map((person, index) => (
          <div
            key={person.id}
            className="flex items-center space-x-3 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div 
              className="relative cursor-pointer"
              onClick={() => handleViewProfile(person)}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={person.avatar || "/placeholder-user.jpg"} alt={person.name} />
                <AvatarFallback>
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {/* Status Indicator */}
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                person.status === 'online' ? 'bg-green-500' : 
                person.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
              }`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 
                  className="font-semibold text-base truncate cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleViewProfile(person)}
                >
                  {person.name}
                </h4>
                {person.isReported && (
                  <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                    Reported
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-600 truncate">
                {person.bio || "No bio"}{person.company ? ` at ${person.company}` : ""}
              </p>
              <div className="flex items-center gap-2 mt-1">
                {person.location && (
                  <span className="flex items-center text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  {person.location}
                  </span>
                )}
                <span className="flex items-center text-xs text-gray-500">
                  <Users className="h-3 w-3 mr-1" />
                  {person.mutualFriends} mutual friends
                </span>
              </div>
          
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={person.isPending ? "outline" : "default"}
                disabled={person.isPending || person.isConnected}
                onClick={() => handleConnect(person.id)}
                className="whitespace-nowrap"
              >
                {person.isConnected
                  ? "Connected"
                  : person.isPending
                  ? "Request Sent"
                  : (
                    <>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Connect
                    </>
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
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem 
                    onClick={() => handleBlock(person.id)}
                    className="text-orange-600"
                    disabled={person.isBlocked}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    {person.isBlocked ? "Blocked" : "Block User"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleReport(person.id)}
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
