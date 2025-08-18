"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { UserPlus, Send } from "lucide-react"

interface JoinRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  communityName: string
  joinCondition: string
  onSubmit: (message: string) => void
  isLoading?: boolean
}

export function JoinRequestModal({
  open,
  onOpenChange,
  communityName,
  joinCondition,
  onSubmit,
  isLoading = false
}: JoinRequestModalProps) {
  const [message, setMessage] = useState("")
  const [charCount, setCharCount] = useState(0)
  const maxChars = 500

  const handleMessageChange = (value: string) => {
    if (value.length <= maxChars) {
      setMessage(value)
      setCharCount(value.length)
    }
  }

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message.trim())
      setMessage("")
      setCharCount(0)
    }
  }

  const isRequiredMessage = joinCondition === "Admin approval required"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UserPlus className="w-5 h-5 mr-2" />
            Join {communityName}
          </DialogTitle>
          <DialogDescription>
            {isRequiredMessage 
              ? "This community requires admin approval. Please tell us why you'd like to join."
              : "Tell the community why you'd like to join (optional)."
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="join-message" className="text-sm font-medium">
              Why do you want to join this community?
              {isRequiredMessage && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id="join-message"
              placeholder="Share your interests, background, or what you hope to contribute to this community..."
              value={message}
              onChange={(e) => handleMessageChange(e.target.value)}
              className="mt-2 min-h-[120px] resize-none"
              disabled={isLoading}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {isRequiredMessage ? "Required field" : "Optional"}
              </span>
              <span className={`text-xs ${charCount > maxChars * 0.9 ? 'text-red-500' : 'text-gray-500'}`}>
                {charCount}/{maxChars}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          {isRequiredMessage ? (
            <Button
              onClick={handleSubmit}
              disabled={!message.trim() || isLoading}
              className="flex items-center"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Send Request
            </Button>
          ) : (
            <div className="flex gap-2">
            
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Join With Message
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
