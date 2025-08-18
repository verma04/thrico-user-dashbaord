"use client"

import type React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { MobileBottomNav } from "@/components/community-page/mobile-nav"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 pb-20 md:pb-4">
          {children}
        </div>
      </SidebarInset>
      
      {/* Mobile Bottom Navigation - Show on all dashboard pages */}
      <MobileBottomNav />
    </SidebarProvider>
  )
}
