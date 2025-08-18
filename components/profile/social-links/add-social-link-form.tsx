"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddSocialLinkFormProps {
  onSave: (data: { platform: string; url: string; icon?: string }) => void
  onCancel: () => void
}

export default function AddSocialLinkForm({ onSave, onCancel }: AddSocialLinkFormProps) {
  const [platform, setPlatform] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Basic validation
    if (!platform.trim() || !url.trim()) {
      alert("Please fill in all fields.")
      return
    }
    // You might want to add more sophisticated URL validation here
    onSave({ platform, url })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Social Link</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="platform">Platform Name</Label>
            <Input
              id="platform"
              placeholder="e.g., LinkedIn, GitHub, Twitter"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="e.g., https://linkedin.com/in/yourprofile"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Link</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
