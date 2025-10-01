"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  Users,
  Menu,
  Settings,
  Bell,
  User,
  Calendar,
  MessageSquare,
  Briefcase,
  Tag,
  ImageIcon,
  Store,
  Building2,
  Newspaper,
  PartyPopper,
  Gamepad2,
  BookOpen,
  MessageCircle,
  UserPlus,
  Rocket,
  LayoutDashboard,
  BarChart3,
  ClipboardList,
  Monitor,
  ShoppingBag,
  Earth,
  CalendarRange,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrimaryColor } from "@/hooks/use-primary-color";

import UserAvatar from "../user-avatar";

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
}

const popularItems: MenuItem[] = [
  { icon: Monitor, label: "Directory", href: "/dashboard/directory" },
  { icon: Users, label: "Communities", href: "/dashboard/communities" },
  { icon: Calendar, label: "Events", href: "/dashboard/events" },
  { icon: Briefcase, label: "Jobs", href: "/dashboard/jobs" },
];

const recentlyViewedItems: MenuItem[] = [
  { icon: Briefcase, label: "Jobs", href: "/dashboard/jobs" },
  {
    icon: MessageSquare,
    label: "Discussion Forum",
    href: "/dashboard/discussions",
  },
  { icon: Tag, label: "Offers", href: "/dashboard/offers" },
  { icon: ImageIcon, label: "Media", href: "/dashboard/media" },
];

const allMenuItems: MenuItem[] = [
  { icon: Monitor, label: "Directory", href: "/dashboard/directory" },
  { icon: Briefcase, label: "Jobs", href: "/dashboard/jobs" },
  { icon: Store, label: "Marketplace", href: "/dashboard/marketplace" },
  {
    icon: MessageSquare,
    label: "Discussion Forum",
    href: "/dashboard/discussions",
  },
  { icon: Tag, label: "Offers", href: "/dashboard/offers" },
  { icon: ShoppingBag, label: "Shop", href: "/dashboard/shop" },
  { icon: Building2, label: "Companies", href: "/dashboard/companies" },
  { icon: Newspaper, label: "News", href: "/dashboard/news" },
  { icon: ImageIcon, label: "Media", href: "/dashboard/media" },
  { icon: PartyPopper, label: "Celebrations", href: "/dashboard/celebrations" },
  { icon: Gamepad2, label: "Gamification", href: "/dashboard/gamification" },
  { icon: BookOpen, label: "Story", href: "/dashboard/stories" },
  { icon: MessageCircle, label: "Chat", href: "/dashboard/chat" },
  { icon: UserPlus, label: "Invite& Refer", href: "/dashboard/invite" },
  { icon: Rocket, label: "Projects", href: "/dashboard/projects" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BarChart3, label: "Polls", href: "/dashboard/polls" },
  { icon: ClipboardList, label: "Survey", href: "/dashboard/surveys" },
];

function MenuSection({
  title,
  items,
  columns = 4,
  onItemClick,
}: {
  title: string;
  items: MenuItem[];
  columns?: number;
  onItemClick: () => void;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4">{title}</h2>
      <div className={`grid grid-cols-${columns} gap-4 px-4`}>
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href || "#"}
            onClick={onItemClick}
            className="flex flex-col items-center justify-center h-28 p-2 "
          >
            <div className="flex items-center justify-center w-14 h-14 mb-2 bg-primary/30  rounded-lg">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <span className="flex-1 flex items-center justify-center text-sm text-gray-700 text-center font-medium leading-tight">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const navigationItems = [
  { href: "/dashboard/feed", icon: Home, label: "Home" },
  { href: "/dashboard/network", icon: Earth, label: "Networks" },
  { href: "/dashboard/communities", icon: Users, label: "Communities" },
  { href: "/dashboard/events", icon: CalendarRange, label: "Events" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-6 h-16">
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 text-xs transition-colors",
                isActive
                  ? "text-primary bg-black-50"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn("w-6 h-=6", isActive && "text-primary")}
              />
              <span
                className={cn(
                  "text-xs",
                  isActive && "font-medium text-primary"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Menu Button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center space-y-1 text-xs transition-colors",
                "text-gray-600 hover:text-gray-900"
              )}
            >
              <LayoutDashboard className="w-6 h-6" />
              <span className="text-xs">Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-full w-full rounded-none bg-white"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Menu</h2>
              </div>

              {/* User Profile Section */}

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto bg-white">
                <div className="py-6">
                  <MenuSection
                    title="POPULAR"
                    items={popularItems}
                    onItemClick={() => setIsMenuOpen(false)}
                  />
                  <MenuSection
                    title="RECENTLY VIEWED"
                    items={recentlyViewedItems}
                    onItemClick={() => setIsMenuOpen(false)}
                  />
                  <MenuSection
                    title="ALL MENU"
                    items={allMenuItems}
                    onItemClick={() => setIsMenuOpen(false)}
                  />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Profile Button */}
        <Link
          href="/dashboard/profile"
          className={cn(
            "flex flex-col items-center justify-center space-y-1 text-xs transition-colors",
            pathname === "/dashboard/profile" ||
              pathname.startsWith("/dashboard/profile")
              ? "text-primary bg-black-50"
              : "text-gray-600 hover:text-gray-900 "
          )}
        >
          <div className="w-7 h-7 bg-primary border-8  rounded-full flex items-center justify-center">
            <UserAvatar />
          </div>
          <span
            className={cn(
              "text-xs",
              (pathname === "/dashboard/profile" ||
                pathname.startsWith("/dashboard/profile")) &&
                "font-medium text-primary"
            )}
          >
            Profile
          </span>
        </Link>
      </div>
    </div>
  );
}

export function MobileHeader({
  title,
  showBack = false,
  actions,
}: {
  title: string;
  showBack?: boolean;
  actions?: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 md:hidden">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center space-x-3">
          {showBack ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
          ) : (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-3 p-4 bg-black-50 rounded-lg">
                    <div className="w-12 h-12 bg-black-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">John Doe</h3>
                      <p className="text-sm text-gray-600">john@example.com</p>
                    </div>
                  </div>

                  <nav className="space-y-2">
                    <Link
                      href="/communities"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                    >
                      <Users className="w-5 h-5" />
                      <span>My Communities</span>
                    </Link>
                    <Link
                      href="/events"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Events</span>
                    </Link>
                    <Link
                      href="/messages"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Messages</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}
          <h1 className="text-lg font-semibold truncate">{title}</h1>
        </div>

        <div className="flex items-center space-x-2">
          {actions}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center">
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function FloatingActionButton({
  onClick,
  icon: Icon,
  label,
}: {
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg z-40 md:hidden"
      size="lg"
    >
      <Icon className="w-6 h-6" />
      <span className="sr-only">{label}</span>
    </Button>
  );
}

/**
 * Converts an OKLCH color string (e.g., "oklch(34.514% 0.01329 248.212)")
 * to a hex color string (e.g., "#1b2540").
 * Requires browser support for CSS Color 4 (most modern browsers).
 */

// -> { r8: 52, g8: 58, b8: 64, hex: '#343a40', ... }

// Usage example:
// const hex = oklchToHex("oklch(34.514% 0.01329 248.212)"); // "#1b2540"
