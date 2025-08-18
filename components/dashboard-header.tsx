"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, Search, Plus, LayoutDashboard, Camera, Briefcase, MessageSquarePlus, List, Calendar, UsersRound, MessageCircle } from 'lucide-react'
import { Suspense } from "react"

export function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="h-4 w-px bg-sidebar-border mx-2" />
      
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Suspense fallback={<div>Loading...</div>}>
            <Input placeholder="Search members, groups, events..." className="pl-10" />
          </Suspense>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Plus className="w-4 h-4" />
              <span className="sr-only">Create new</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Create Feed</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Camera className="mr-2 h-4 w-4" />
              <span>Create Story</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Create Job</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              <span>Discussion Forum</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <List className="mr-2 h-4 w-4" />
              <span>Create Listing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Create Event</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UsersRound className="mr-2 h-4 w-4" />
              <span>Create Community</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button asChild variant="ghost" size="icon">
          <a href="/dashboard/chat">
            <MessageCircle className="w-4 h-4" />
            <span className="sr-only">Chat</span>
          </a>
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  )
}
