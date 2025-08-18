"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"
import { usePostStore } from "@/lib/post-store"

export function ImageUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const addMedia = usePostStore((state) => state.addMedia)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const uri = URL.createObjectURL(file)
        addMedia({ uri, file })
      }
    })

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />
      <Button variant="ghost" size="sm" onClick={handleClick} className="h-10 w-10 rounded-full p-0">
        <ImageIcon className="h-5 w-5" />
      </Button>
    </>
  )
}
