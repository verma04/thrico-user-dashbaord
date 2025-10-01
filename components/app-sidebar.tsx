"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Home, Users, Calendar, MessageSquare, Briefcase, Settings, LogOut, ShoppingBag, Rss, UserCheck, Gift, User, ClipboardList, FileText, Newspaper, Heart, Trophy, Network, UserPlus, UserX } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useGetOrgDetails, useGetUser } from "./grapqhl/action"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Feed", href: "/dashboard/feed", icon: Rss },

  { name: "Communities", href: "/dashboard/communities", icon: Users },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Discussions", href: "/dashboard/discussions", icon: MessageSquare },
  { name: "Marketplace", href: "/dashboard/listing", icon: ShoppingBag },
  { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
  { name: "Offers", href: "/dashboard/offers", icon: Gift },
  { name: "Network", href: "/dashboard/network", icon: Network },

  { name: "Gamification", href: "/dashboard/gamification", icon: Trophy },
  { name: "Surveys", href: "/dashboard/surveys", icon: ClipboardList },
  { name: "Forms", href: "/dashboard/forms", icon: FileText },
  { name: "News", href: "/dashboard/news", icon: Newspaper },
  { name: "Memories", href: "/dashboard/memories", icon: Heart },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Help", href: "/dashboard/help", icon: UserCheck },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


  const pathname = usePathname()

  const { data: { getUser } = {}, loading, error } = useGetUser();

  const { data: { getOrgDetails } = {} } = useGetOrgDetails();



  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r text-sidebar-primary-foreground">
                   <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={`https://cdn.thrico.network/${getOrgDetails?.logo}`} className="object-contain" alt="Sarah Chen" />
                      <AvatarFallback className="rounded-lg">SC</AvatarFallback>
                    </Avatar>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{getOrgDetails?.name}</span>
                  <span className="truncate text-xs">Community Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={`https://cdn.thrico.network/${getUser?.avatar}`} alt="Sarah Chen" />
                    <AvatarFallback className="rounded-lg">SC</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{getUser?.firstName} {getUser?.lastName}</span>
                    <span className="truncate text-xs">{getUser?.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={`https://cdn.thrico.network/${getUser?.avatar}`} alt="Sarah Chen" />
                      <AvatarFallback className="rounded-lg">SC</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{getUser?.firstName} {getUser?.lastName}</span>
                      <span className="truncate text-xs">{getUser?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
