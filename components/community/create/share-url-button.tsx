"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Check } from "lucide-react"
import { toast } from "sonner"

interface ShareUrlButtonProps {
  className?: string
}

export function ShareUrlButton({ className }: ShareUrlButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast.success("URL copied to clipboard!")

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      toast.error("Failed to copy URL")
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleShare} className={className}>
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </>
      )}
    </Button>
  )
}
