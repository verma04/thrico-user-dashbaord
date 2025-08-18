"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MobileBottomNav } from "@/components/community-page/mobile-nav"
import {
  ArrowLeft,
  SettingsIcon,
  Users,
  UserCheck,
  MessageSquare,
  Calendar,
  BarChart3,
} from "lucide-react"

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const pathname = usePathname()
  const communityId = params.id as string

  // Mock data for badge counts - in real app, this would come from your data store
  const joinRequestsCount = 3

  const getCurrentTab = () => {
    if (pathname.includes('/settings')) return 'settings'
    if (pathname.includes('/members')) return 'members'
    if (pathname.includes('/requests')) return 'requests'
    if (pathname.includes('/discussions')) return 'discussions'
    if (pathname.includes('/events')) return 'events'
    if (pathname.includes('/analytics')) return 'analytics'
    return 'settings'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href={`/dashboard/communities/${communityId}`} 
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Community
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Community Management</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Community</h1>
          <p className="text-gray-600">Configure your community settings and manage members.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <Tabs value={getCurrentTab()}>
            <TabsList className="grid w-full grid-cols-6">
              <Link href={`/dashboard/communities/${communityId}/manage/settings`}>
                <TabsTrigger 
                  value="settings" 
                  className={`w-full ${getCurrentTab() === 'settings' ? 'data-[state=active]' : ''}`}
                >
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  Settings
                </TabsTrigger>
              </Link>
            <Link href={`/dashboard/communities/${communityId}/manage/members`}>
              <TabsTrigger 
                value="members"
                className={`w-full ${getCurrentTab() === 'members' ? 'data-[state=active]' : ''}`}
              >
                <Users className="w-4 h-4 mr-2" />
                Members
              </TabsTrigger>
            </Link>
            <Link href={`/dashboard/communities/${communityId}/manage/requests`}>
              <TabsTrigger 
                value="requests"
                className={`w-full ${getCurrentTab() === 'requests' ? 'data-[state=active]' : ''}`}
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Requests
                {joinRequestsCount > 0 && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    {joinRequestsCount}
                  </Badge>
                )}
              </TabsTrigger>
            </Link>
            <Link href={`/dashboard/communities/${communityId}/manage/discussions`}>
              <TabsTrigger 
                value="discussions"
                className={`w-full ${getCurrentTab() === 'discussions' ? 'data-[state=active]' : ''}`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Discussions
              </TabsTrigger>
            </Link>
            <Link href={`/dashboard/communities/${communityId}/manage/events`}>
              <TabsTrigger 
                value="events"
                className={`w-full ${getCurrentTab() === 'events' ? 'data-[state=active]' : ''}`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Events
              </TabsTrigger>
            </Link>
            <Link href={`/dashboard/communities/${communityId}/manage/analytics`}>
              <TabsTrigger 
                value="analytics"
                className={`w-full ${getCurrentTab() === 'analytics' ? 'data-[state=active]' : ''}`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </Link>
          </TabsList>
          </Tabs>
        </div>

        {/* Page Content */}
        <div className="pb-20 md:pb-4">
          {children}
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}
