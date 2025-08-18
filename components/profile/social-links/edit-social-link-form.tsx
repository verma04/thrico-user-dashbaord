"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
}

interface EditSocialLinkFormProps {
  socialLinkData: SocialLink
  onSave: (data: SocialLink) => void
  onCancel: () => void
}

export default function EditSocialLinkForm({ socialLinkData, onSave, onCancel }: EditSocialLinkFormProps) {
  const [platform, setPlatform] = useState(socialLinkData.platform || "")
  const [url, setUrl] = useState(socialLinkData.url || "")

  useEffect(() => {
    // Update state if socialLinkData changes (e.g., when editing a different item)
    setPlatform(socialLinkData.platform || "")
    setUrl(socialLinkData.url || "")
  }, [socialLinkData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Basic validation
    if (!platform.trim() || !url.trim()) {
      alert("Please fill in all fields.")
      return
    }
    const updatedData = {
      ...socialLinkData, // Keep existing ID and other properties
      platform,
      url,
    }
    onSave(updatedData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Social Link</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="platform">Platform Name</Label>
            <Input
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="e.g., LinkedIn, GitHub, Twitter"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g., https://linkedin.com/in/yourprofile"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
