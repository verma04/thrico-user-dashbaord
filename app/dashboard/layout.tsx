"use client"

import type React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { MobileBottomNav } from "@/components/community-page/mobile-nav"

import { ApolloWrapper } from "@/utils/apollo-provider"
import withAuth from "@/components/hoc/withAuth"


  function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <SidebarProvider>
        <AppSidebar  />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 pb-20 md:pb-4">
            {children}
          </div>
        </SidebarInset>
        <MobileBottomNav />
      </SidebarProvider>
    </>
  )
}

export default withAuth(DashboardLayout)