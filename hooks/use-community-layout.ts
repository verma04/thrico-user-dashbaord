"use client"

import { createContext, useContext } from "react"
import type { Community } from "@/types/community"

// Create context for sharing layout state with inner pages
export interface CommunityLayoutContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
  community: Community
  groupData: {
    id: string
    status: string
    isFeatured: boolean
    role: string
    joinCondition: string
    memberCountVisibility: string
    postApprovalProcess: string
    postPermissions: string
  } | null
  handleJoinCommunity: () => void
  handleRatingSubmit: (rating: number) => void
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

export const CommunityLayoutContext = createContext<CommunityLayoutContextType | null>(null)

export const useCommunityLayout = () => {
  const context = useContext(CommunityLayoutContext)
  if (!context) {
    throw new Error("useCommunityLayout must be used within a CommunityLayoutProvider")
  }
  return context
}
