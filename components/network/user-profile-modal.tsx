"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  UserPlus,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  Calendar,
  Globe,
  MoreHorizontal,
  Star,
  Send,
  X,
  Flag,
  UserX,
  Check
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserProfileData {
  id: string;
  name: string;
  avatar: string;
  coverPhoto?: string;
  bio?: string;
  location?: string;
  company?: string;
  position?: string;
  education?: string;
  joinedDate: string;
  mutualFriends: number;
  totalConnections: number;
  status: "online" | "offline" | "away";
  isConnected: boolean;
  isPending: boolean;
  isClose: boolean;
  hasIncomingRequest?: boolean;
  skills?: string[];
  recentActivity?: {
    type: "post" | "event" | "community";
    title: string;
    date: string;
  }[];
  achievements?: {
    title: string;
    icon: string;
    date: string;
  }[];
}

interface UserProfileModalProps {
  user: UserProfileData | null;
  isOpen: boolean;
  onClose: () => void;
  onConnect?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  onUnfriend?: (userId: string) => void;
  onBlock?: (userId: string) => void;
  onWithdrawRequest?: (userId: string) => void;
  onAcceptRequest?: (userId: string) => void;
  onDeclineRequest?: (userId: string) => void;
}
import { faker } from '@faker-js/faker';
export function UserProfileModal({
  user,
  isOpen,
  onClose,
  onConnect,
  onMessage,
  onUnfriend,
  onBlock,
  onWithdrawRequest,
  onAcceptRequest,
  onDeclineRequest
}: UserProfileModalProps) {
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showUnfriendDialog, setShowUnfriendDialog] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  
  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  const formatJoinedDate = (date: string) => {
    const joined = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joined.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[60vw] w-full max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 py-4 border-b bg-white sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Users className="h-5 w-5" />
              {user.name}'s Profile
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <div className="relative">
            {/* Cover Photo */}
            <div className="h-50 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4 relative overflow-hidden">
           
                <img 
                  src={faker.image.avatar()} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
              
              <div className="absolute inset-0  bg-opacity-20"></div>
            </div>
            
            {/* Avatar and Basic Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-8 relative z-10">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src={user.avatar || "/placeholder-user.jpg"} alt={user.name} />
                  <AvatarFallback className="text-xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {/* Status Indicator */}
                <div className={`absolute bottom-1 right-1 w-6 h-6 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    {user.position && user.company && (
                      <p className="text-gray-600 flex items-center mt-1">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {user.position} at {user.company}
                      </p>
                    )}
                    {user.location && (
                      <p className="text-gray-500 flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {user.location}
                      </p>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      View Full Profile
                    </Button>
                    {user.isConnected ? (
                      <>
                        <Button onClick={() => onMessage?.(user.id)} className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          Message
                        </Button>
                      </>
                    ) : user.hasIncomingRequest ? (
                      <>
                        <Button
                          onClick={() => setShowAcceptDialog(true)}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4" />
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowDeclineDialog(true)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                          Decline
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => onConnect?.(user.id)}
                        disabled={user.isPending}
                        className="flex items-center gap-1"
                      >
                        <UserPlus className="h-4 w-4" />
                        {user.isPending ? "Request Sent" : "Connect"}
                      </Button>
                    )}
                    {user.isPending && (
                      <Button
                        variant="outline"
                        onClick={() => setShowWithdrawDialog(true)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                        Withdraw
                      </Button>
                    )}
                    {user.isConnected && (
                      <Button
                        variant="outline"
                        onClick={() => setShowUnfriendDialog(true)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      >
                        <UserX className="h-4 w-4" />
                        Unfriend
                      </Button>
                    )}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {user.isClose && (
                          <>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Star className="h-4 w-4" />
                              Remove from Close Friends
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Share Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 text-orange-600 hover:text-orange-700">
                          <Flag className="h-4 w-4" />
                          Report Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-red-600 hover:text-red-700"
                          onClick={() => setShowBlockDialog(true)}
                        >
                          <UserX className="h-4 w-4" />
                          Block Profile
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              {user.bio && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{user.bio}</p>
                  </CardContent>
                </Card>
              )}

              {/* Skills */}
              {user.skills && user.skills.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Activity */}
              {user.recentActivity && user.recentActivity.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {user.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            {activity.type === "post" && "📝"}
                            {activity.type === "event" && "📅"}
                            {activity.type === "community" && "👥"}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{activity.title}</p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Connection Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Connections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Connections</span>
                    <span className="font-semibold">{user.totalConnections}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Mutual Friends</span>
                    <span className="font-semibold">{user.mutualFriends}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="font-semibold text-sm">{formatJoinedDate(user.joinedDate)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              {user.achievements && user.achievements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {user.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{achievement.title}</p>
                            <p className="text-xs text-gray-500">{achievement.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {user.education && (
                    <div className="flex items-center space-x-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{user.education}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">Joined {formatJoinedDate(user.joinedDate)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Block User Confirmation Dialog */}
      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Block {user.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will block {user.name} from seeing your profile, finding you in search, and messaging you. They will not be notified that you blocked them.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onBlock?.(user.id);
                setShowBlockDialog(false);
                onClose();
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Block User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Unfriend User Confirmation Dialog */}
      <AlertDialog open={showUnfriendDialog} onOpenChange={setShowUnfriendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unfriend {user.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove {user.name} from your friends list. You can send them a friend request again later if you change your mind.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onUnfriend?.(user.id);
                setShowUnfriendDialog(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Unfriend
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Withdraw Request Confirmation Dialog */}
      <AlertDialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Withdraw friend request?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel your friend request to {user.name}. You can send another request later if you change your mind.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onWithdrawRequest?.(user.id);
                setShowWithdrawDialog(false);
              }}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Withdraw Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Accept Request Confirmation Dialog */}
      <AlertDialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Accept friend request from {user.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will add {user.name} to your friends list. You'll be able to see each other's posts and send messages.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onAcceptRequest?.(user.id);
                setShowAcceptDialog(false);
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Accept Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Decline Request Confirmation Dialog */}
      <AlertDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decline friend request from {user.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will decline the friend request from {user.name}. They will not be notified that you declined their request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDeclineRequest?.(user.id);
                setShowDeclineDialog(false);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Decline Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
