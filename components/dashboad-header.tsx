"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  Briefcase,
  Settings,
  LogOut,
  Bell,
  Search,
  ShoppingBag,
  Rss,
  UserCheck,
  Gift,
  User,
  ClipboardList,
  FileText,
  Newspaper,
  Heart,
  Plus,
  LayoutDashboard,
  Camera,
  List,
  MessageSquarePlus,
  UsersRound,
  Trophy,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import FeedModal from "./feed/feed-modal";
import { useDrawerStore } from "@/store/drawer-store";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Feed", href: "/dashboard/feed", icon: Rss },
  { name: "Communities", href: "/dashboard/communities", icon: Users },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Discussions", href: "/dashboard/discussions", icon: MessageSquare },
  { name: "Marketplace", href: "/dashboard/marketplace", icon: ShoppingBag },
  { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
  { name: "Offers", href: "/dashboard/offers", icon: Gift },
  { name: "Connections", href: "/dashboard/connections", icon: UserCheck },
  { name: "Gamification", href: "/dashboard/gamification", icon: Trophy },
  { name: "Surveys", href: "/dashboard/surveys", icon: ClipboardList },
  { name: "Forms", href: "/dashboard/forms", icon: FileText },
  { name: "News", href: "/dashboard/news", icon: Newspaper },
  { name: "Memorials", href: "/dashboard/memorials", icon: Heart },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const drawerStore = useDrawerStore();
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Thrico</span>
              </Link>

              {/* Search */}
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Suspense fallback={<div>Loading...</div>}>
                    <Input
                      placeholder="Search members, groups, events..."
                      className="pl-10"
                    />
                  </Suspense>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4 ">
                {/* Chat Button */}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      <span className="hidden xs:inline">Quick Actions</span>
                      <span className="xs:hidden">Create</span>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/feed/create"
                        className="flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Post
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/events/create"
                        className="flex items-center"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        New Event
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/discussions/create"
                        className="flex items-center"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Start Discussion
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/chat"
                        className="flex items-center"
                      >
                        <MessageSquarePlus className="w-4 h-4 mr-2" />
                        Start Chat
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/communities/create"
                        className="flex items-center"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Create Community
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/marketplace/create"
                        className="flex items-center"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        List Item
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/jobs/create"
                        className="flex items-center"
                      >
                        <Briefcase className="w-4 h-4 mr-2" />
                        Post Job
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/surveys/create"
                        className="flex items-center"
                      >
                        <ClipboardList className="w-4 h-4 mr-2" />
                        Create Survey
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/forms/create"
                        className="flex items-center"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Create Form
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/chat" className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Chat</span>
                  </Link>
                </Button>

                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="Sarah Chen"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Sarah Chen
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          sarah@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex pt-16">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto">
            <nav className="p-4">
              <div className="space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className="w-full justify-start"
                      >
                        <item.icon className="mr-3 h-4 w-4" />
                        {item.name}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-64">{children}</main>
        </div>
      </div>

      <FeedModal />
    </>
  );
}
