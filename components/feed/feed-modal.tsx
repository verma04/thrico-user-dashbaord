"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, X, AlertCircle, Save } from "lucide-react"
import { usePostStore } from "@/lib/post-store"
import { SavePostModal } from "./save-post-modal"
import { ExpandablePostMenu } from "./expandable-post-menu"
import { PostTypePreview } from "./post-type-preview"
import { PrivacySelector } from "./privacy-selector"

// Constants
const MAX_DESCRIPTION_LENGTH = 1000
const MAX_MEDIA_COUNT = 10
const AUTO_SAVE_DELAY = 2000

// Types
interface PostData {
  title: string
  content: string
  category: string
  privacy: string
  tags: string[]
  images: string[]
  postType: string | null
}

interface FeedModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (postData: PostData) => Promise<void> | void
  defaultPrivacy?: string
  maxDescriptionLength?: number
  allowedPostTypes?: string[]
}

export function FeedModal({ 
  open, 
  onOpenChange, 
  onSubmit,
  defaultPrivacy = "PUBLIC",
  maxDescriptionLength = MAX_DESCRIPTION_LENGTH,
  allowedPostTypes = []
}: FeedModalProps) {
  const [privacy, setPrivacy] = useState(defaultPrivacy)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null)

  const {
    description,
    media,
    loading,
    isFormValid,
    hasContent,
    setDescription,
    removeMedia,
    resetForm,
    closeMenu,
    isMenuExpanded,
    selectedPostType,
    pollData,
    celebration,
    forum,
  } = usePostStore()

  // Auto-save draft functionality
  useEffect(() => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
    }

    if (hasContent()) {
      const timeout = setTimeout(() => {
        // Auto-save logic could be implemented here
        console.log("Auto-saving draft...")
        try {
          const draftData = {
            description,
            media,
            selectedPostType,
            privacy,
            timestamp: new Date().toISOString()
          }
          localStorage.setItem('feedModalDraft', JSON.stringify(draftData))
        } catch (error) {
          console.error("Failed to auto-save draft:", error)
        }
      }, AUTO_SAVE_DELAY)
      
      setAutoSaveTimeout(timeout)
    }

    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout)
      }
    }
  }, [description, media, selectedPostType, hasContent]) // Removed autoSaveTimeout from dependencies

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout)
        setAutoSaveTimeout(null)
      }
    }
  }, [])

  // Memoized values
  const characterCount = useMemo(() => description.length, [description])
  const remainingCharacters = useMemo(() => maxDescriptionLength - characterCount, [maxDescriptionLength, characterCount])
  const isNearLimit = useMemo(() => remainingCharacters <= 50, [remainingCharacters])
  const isOverLimit = useMemo(() => remainingCharacters < 0, [remainingCharacters])

  const extractedTags = useMemo(() => {
    const hashtagRegex = /#(\w+)/g
    const matches = description.match(hashtagRegex) || []
    return matches.map((tag) => tag.substring(1))
  }, [description])

  const postCategory = useMemo(() => {
    switch (selectedPostType) {
      case "job":
        return "Jobs"
      case "discussion":
        return "Discussion"
      case "poll":
        return "Poll"
      case "celebrate":
        return "Celebration"
      default:
        return ""
    }
  }, [selectedPostType])

  const canSubmit = useMemo(() => {
    return isFormValid() && !isOverLimit && !isSubmitting && !loading
  }, [isFormValid, isOverLimit, isSubmitting, loading])

  // Event handlers with useCallback for performance
  const handleBack = useCallback(() => {
    if (hasContent()) {
      setShowSaveModal(true)
    } else {
      onOpenChange(false)
      resetForm()
    }
  }, [hasContent, onOpenChange, resetForm])

  const handleSave = useCallback(() => {
    // Enhanced save draft logic
    try {
      // Save to localStorage or send to API
      const draftData = {
        description,
        media,
        selectedPostType,
        privacy,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('feedModalDraft', JSON.stringify(draftData))
      
      setShowSaveModal(false)
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to save draft:", error)
      setSubmitError("Failed to save draft. Please try again.")
    }
  }, [description, media, selectedPostType, privacy, onOpenChange])

  const handleDiscard = useCallback(() => {
    try {
      // Clear any saved draft
      localStorage.removeItem('feedModalDraft')
      resetForm()
      setShowSaveModal(false)
      onOpenChange(false)
      setSubmitError(null)
    } catch (error) {
      console.error("Failed to discard draft:", error)
    }
  }, [resetForm, onOpenChange])

  const handlePost = useCallback(async () => {
    if (!canSubmit) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const postData: PostData = {
        title: "",
        content: description,
        category: postCategory,
        privacy: privacy.toLowerCase(),
        tags: extractedTags,
        images: media.map((m) => m.uri).filter(Boolean),
        postType: selectedPostType,
      }

      await onSubmit(postData)
      
      // Clear draft on successful submit
      localStorage.removeItem('feedModalDraft')
      resetForm()
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to submit post:", error)
      setSubmitError(error instanceof Error ? error.message : "Failed to submit post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }, [canSubmit, description, postCategory, privacy, extractedTags, media, selectedPostType, onSubmit, resetForm, onOpenChange])

  const handleDescriptionChange = useCallback((value: string) => {
    if (value.length <= maxDescriptionLength) {
      setDescription(value)
      setSubmitError(null) // Clear any previous errors
    }
  }, [setDescription, maxDescriptionLength])

  const handleTextareaFocus = useCallback(() => {
    if (isMenuExpanded) {
      closeMenu()
    }
  }, [isMenuExpanded, closeMenu])

  const handleMediaRemove = useCallback((index: number) => {
    removeMedia(index)
  }, [removeMedia])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleBack()
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handlePost()
    }
  }, [handleBack, handlePost])

  // Load draft on mount
  useEffect(() => {
    if (open) {
      try {
        const savedDraft = localStorage.getItem('feedModalDraft')
        if (savedDraft) {
          const draftData = JSON.parse(savedDraft)
          // Only restore if the modal was just opened and current content is empty
          if (!hasContent() && draftData.description) {
            setDescription(draftData.description)
            if (draftData.privacy) {
              setPrivacy(draftData.privacy)
            }
            // Note: Media restoration would require additional store methods
            console.log("Draft restored from:", draftData.timestamp)
          }
        }
      } catch (error) {
        console.error("Failed to load draft:", error)
      }
    }
  }, [open, hasContent, setDescription])

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent 
          className="w-full max-w-[900px]  max-h-[800px] p-0 gap-0 flex flex-col sm:w-[95vw] lg:w-[900px] border-b"
          onKeyDown={handleKeyDown}
          aria-labelledby="feed-modal-title"
          aria-describedby="feed-modal-description"
        >
          <DialogHeader className="p-0">
            <DialogTitle id="feed-modal-title" className="sr-only">
              Create New Post
            </DialogTitle>
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background border-b">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBack}
                    aria-label="Go back or save draft"
                    className="shrink-0"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <PrivacySelector privacy={privacy} setPrivacy={setPrivacy} />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  {hasContent() && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSave}
                      disabled={isSubmitting}
                      aria-label="Save draft"
                      className="hidden sm:flex items-center gap-1"
                    >
                      <Save className="h-3 w-3" />
                      Save
                    </Button>
                  )}
                  <Button 
                    onClick={handlePost} 
                    disabled={!canSubmit} 
                    className="min-w-[80px]"
                    aria-label={isSubmitting ? "Posting content" : "Post content"}
                  >
                    {isSubmitting ? "Posting..." : loading ? "Loading..." : "Post"}
                  </Button>
                </div>
              </div>
              
              {/* Error display */}
              {submitError && (
                <div className="px-4 pb-3">
                  <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-2 rounded-md">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{submitError}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSubmitError(null)}
                      className="ml-auto h-6 w-6 p-0"
                      aria-label="Dismiss error"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 overflow-auto">
            {/* Main Content */}
            <div className="p-4 space-y-4" id="feed-modal-description">
              {/* Text Input */}
              <Card>
                <CardContent className="p-4">
                  <Textarea
                    value={description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    onFocus={handleTextareaFocus}
                    placeholder="Share your thoughts..."
                    className="min-h-[120px] border-0 resize-none focus-visible:ring-0 text-base"
                    maxLength={maxDescriptionLength}
                    aria-label="Post content"
                    aria-describedby="character-count"
                  />
                </CardContent>
              </Card>

              {/* Hashtags Preview */}
              {extractedTags.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-muted-foreground">Tags:</span>
                      {extractedTags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Media Preview */}
              {media.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Media ({media.length}/{MAX_MEDIA_COUNT})</h4>
                        {media.length >= MAX_MEDIA_COUNT && (
                          <Badge variant="outline" className="text-xs">
                            Limit reached
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {media.map((item, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={item.uri || "/placeholder.svg"}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border"
                              loading="lazy"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleMediaRemove(index)}
                              className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label={`Remove image ${index + 1}`}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Post Type Preview */}
              <PostTypePreview />

              {/* Character Count and Status */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {selectedPostType && (
                    <Badge variant="outline" className="text-xs capitalize">
                      {selectedPostType}
                    </Badge>
                  )}
                  {postCategory && (
                    <Badge variant="secondary" className="text-xs">
                      {postCategory}
                    </Badge>
                  )}
                </div>
                <div 
                  id="character-count" 
                  className={`text-right ${
                    isOverLimit 
                      ? "text-destructive font-medium" 
                      : isNearLimit 
                        ? "text-orange-500 font-medium" 
                        : "text-muted-foreground"
                  }`}
                  aria-live="polite"
                >
                  {characterCount}/{maxDescriptionLength}
                  {isOverLimit && (
                    <span className="ml-1 text-xs">
                      ({Math.abs(remainingCharacters)} over limit)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>

          <Separator />

          {/* Bottom Menu */}
          <div className="border-t p-4 bg-muted/50">
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                Press Ctrl+Enter to post quickly
              </div>
              <ExpandablePostMenu />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Save Modal */}
      <SavePostModal
        open={showSaveModal}
        onOpenChange={setShowSaveModal}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </>
  )
}

// Helper functions
export const validatePostContent = (content: string, maxLength: number = MAX_DESCRIPTION_LENGTH) => {
  const trimmedContent = content.trim()
  
  return {
    isValid: trimmedContent.length > 0 && trimmedContent.length <= maxLength,
    isEmpty: trimmedContent.length === 0,
    tooLong: trimmedContent.length > maxLength,
    length: trimmedContent.length,
    remaining: maxLength - trimmedContent.length
  }
}

export const formatPostPreview = (content: string, maxPreviewLength: number = 100) => {
  if (content.length <= maxPreviewLength) return content
  return content.substring(0, maxPreviewLength) + "..."
}

// Default export for easier imports
export default FeedModal
