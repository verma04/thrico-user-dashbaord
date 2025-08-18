"use client"

import { ReactNode, useState, useEffect, createContext, useContext } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import {
  Users,
  Settings,
  MoreHorizontal,
  Star,
  Bookmark,
  BookmarkPlus,
  Flag,
  UserX,
  Shield,
  Heart,
  Share,
} from "lucide-react"
import { toast } from "sonner"
import { MobileBottomNav, MobileHeader } from "@/components/community-page/mobile-nav"
import { CommunityHeader } from "@/components/community-page/community-header"
import { CommunitySidebar } from "@/components/community-page/community-sidebar"
import { communityData } from "@/lib/mock-data"
import { useCommunityActions } from "@/hooks/use-community-actions"

// Create context for sharing layout state with inner pages
interface CommunityLayoutContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
  community: any
  groupData: {
    id: string
    status: string
    isFeatured: boolean
    isWishList: boolean
    isTrending: boolean
    group: {
      title: string
      cover: string
      id: string
      slug: string
      total: number
      description: string
      privacy: string
      isGroupMember: boolean
      isJoinRequest: boolean
      isGroupAdmin: boolean
      isTrending: boolean
      numberOfUser: number
      numberOfLikes: number
      numberOfPost: number
      createdAt: string
      numberOfViews: number
      tag: string
      isFeatured: boolean
      location: string
      tagline: string
    }
    groupSettings: {
      groupType: string
      joiningCondition: string
      privacy: string
    }
    groupStatus: string
    role: string
  } | null
  handleJoinCommunity: () => void
  handleRatingSubmit: (rating: number, review?: string) => void
  canManageCommunity: boolean
  formattedMemberCount: string
  showCommunityInfo: boolean
  setShowCommunityInfo: (show: boolean) => void
  isSaved: boolean
  toggleSaveGroup: () => void
  handleReportGroup: () => void
  handleBlockGroup: () => void
  handleShareGroup: () => void
}

const CommunityLayoutContext = createContext<CommunityLayoutContextType | undefined>(undefined)

// Hook to use the context in inner pages
export const useCommunityLayout = () => {
  const context = useContext(CommunityLayoutContext)
  if (context === undefined) {
    throw new Error('useCommunityLayout must be used within a CommunityLayout')
  }
  return context
}

interface CommunityLayoutProps {
  children: ReactNode
  params: { id: string }
}

export default function CommunityLayout({ children, params }: CommunityLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [showCommunityInfo, setShowCommunityInfo] = useState(false)
  const [groupData, setGroupData] = useState<CommunityLayoutContextType['groupData']>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [showBlockDialog, setShowBlockDialog] = useState(false)
  
  // Determine active tab from URL
  const getActiveTabFromPath = () => {
    if (pathname.includes('/discussions')) return 'discussions'
    if (pathname.includes('/media')) return 'media'
    if (pathname.includes('/events')) return 'events'
    if (pathname.includes('/ratings')) return 'ratings'
    if (pathname.includes('/about')) return 'about'
    return 'discussions' // Default to discussions (formerly posts)
  }

  const [activeTab, setActiveTab] = useState(getActiveTabFromPath())

  // Update active tab when pathname changes
  useEffect(() => {
    setActiveTab(getActiveTabFromPath())
  }, [pathname])

  // Handle tab change with navigation
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const basePath = `/dashboard/communities/${params.id}`
    
    switch (value) {
      case 'discussions':
        router.push(basePath)
        break
      case 'media':
        router.push(`${basePath}/media`)
        break
      case 'events':
        router.push(`${basePath}/events`)
        break
      case 'ratings':
        router.push(`${basePath}/ratings`)
        break
      case 'about':
        router.push(`${basePath}/about`)
        break
      default:
        router.push(basePath)
    }
  }
  
  const {
    community,
    handleJoinCommunity,
    handleRatingSubmit,
    canManageCommunity,
    formattedMemberCount,
    isJoining,
  } = useCommunityActions(communityData, [])

  // Fetch group data (replace with actual API call)
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        // Replace this with your actual API call
        // const response = await fetch(`/api/groups/${params.id}`)
        // const data = await response.json()
        
        // Mock data structure for now
        const mockGroupData = {
          id: params.id,
          status: "active",
          isFeatured: (community as any)?.isFeatured || false,
          isWishList: false,
          isTrending: (community as any)?.isTrending || false,
          group: {
            title: community?.name || "Community",
            cover: community?.coverImage || "/placeholder.svg",
            id: params.id,
            slug: (community as any)?.slug || params.id,
            total: (community as any)?.memberCount || community?.members || 0,
            description: community?.description || "",
            privacy: community?.privacy || "public",
            isGroupMember: community?.isJoined || false,
            isJoinRequest: false,
            isGroupAdmin: canManageCommunity,
            isTrending: (community as any)?.isTrending || false,
            numberOfUser: (community as any)?.memberCount || community?.members || 0,
            numberOfLikes: (community as any)?.likes || 0,
            numberOfPost: (community as any)?.postCount || 0,
            createdAt: (community as any)?.createdAt || new Date().toISOString(),
            numberOfViews: (community as any)?.views || 0,
            tag: community?.categories?.join(',') || "",
            isFeatured: (community as any)?.isFeatured || false,
            location: community?.location || "",
            tagline: community?.headline || ""
          },
          groupSettings: {
            groupType: (community as any)?.communityType || "public",
            joiningCondition: community?.joinCondition || "open",
            privacy: community?.privacy || "public"
          },
          groupStatus: "active",
          role: canManageCommunity ? "admin" : "member"
        }
        
        setGroupData(mockGroupData)
      } catch (error) {
        console.error('Error fetching group data:', error)
      }
    }

    fetchGroupData()
  }, [params.id, community, canManageCommunity])

  // Context value to share with inner pages
  const contextValue: CommunityLayoutContextType = {
    activeTab,
    setActiveTab,
    community,
    groupData,
    handleJoinCommunity,
    handleRatingSubmit,
    canManageCommunity,
    formattedMemberCount,
    showCommunityInfo,
    setShowCommunityInfo,
    isSaved,
    toggleSaveGroup: () => setIsSaved(!isSaved),
    handleReportGroup: () => setShowReportDialog(true),
    handleBlockGroup: () => setShowBlockDialog(true),
    handleShareGroup: () => {
      // Implement share functionality
      if (navigator.share) {
        navigator.share({
          title: community.name,
          text: community.description,
          url: window.location.href
        })
      } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href)
      }
    }
  }

  return (
    <CommunityLayoutContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-8">
      {/* Mobile Header */}
      <MobileHeader
        title={groupData?.group?.title || community?.name || "Community"}
        showBack={true}
        actions={
          <div className="flex items-center space-x-2">
            <Sheet open={showCommunityInfo} onOpenChange={setShowCommunityInfo}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 max-w-sm">
                <div className="space-y-6 mt-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{groupData?.group?.title || community?.name}</h3>
                    <p className="text-sm text-blue-600 mb-2">{groupData?.group?.tagline || community?.headline}</p>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {groupData?.group?.numberOfUser?.toLocaleString() || community?.members?.toLocaleString() || 0}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {community?.rating || 0}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">About</h4>
                    <p className="text-sm text-gray-600">{groupData?.group?.description || community?.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Categories</h4>
                    <div className="flex flex-wrap gap-1">
                      {(groupData?.group?.tag?.split(',') || community?.categories || []).map((category: string) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {(groupData?.group?.isGroupAdmin || canManageCommunity) && (
                    <Link href={`/communities/${params.id}/manage`}>
                      <Button className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Community
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        }
      />

      {/* Cover Image */}
      <div className="h-32 md:h-64 bg-gray-200 relative ">
        <img
          src={"https://cdn.thrico.network/defaultEventCover.png"}
          alt={groupData?.group?.title || community?.name || "Community"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" />
      </div>

      {/* Community Info */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <CommunityHeader
          community={community}
          onJoinCommunity={handleJoinCommunity}
          canManageCommunity={canManageCommunity}
          formattedMemberCount={formattedMemberCount}
          params={params}
          isJoining={isJoining}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-8 mt-4 md:mt-8 pb-20 md:pb-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-5 h-9 md:h-10 mb-2 sm:mb-4">
                {[
                  { value: "discussions", label: "Discussions" },
                  { value: "media", label: "Media" },
                  { value: "events", label: "Events" },
                  { value: "ratings", label: "Ratings" },
                  { value: "about", label: "About" },
                ].map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value} className="text-xs md:text-sm px-1 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {children}
            </Tabs>
          </div>

          {/* Sidebar - Desktop Only */}
          <CommunitySidebar
            community={community}
            params={params}
            onRatingSubmit={handleRatingSubmit}
          />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Report Group Dialog */}
      <AlertDialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Report Group</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to report this group? This action will notify moderators.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              // Implement report logic
              console.log('Reporting group:', community.name)
              setShowReportDialog(false)
            }}>
              Report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Block Group Dialog */}
      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Block Group</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to block this group? You will no longer see content from this group.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              // Implement block logic
              console.log('Blocking group:', community.name)
              setShowBlockDialog(false)
            }}>
              Block
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </CommunityLayoutContext.Provider>
  )
}
