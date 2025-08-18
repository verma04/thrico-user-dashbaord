"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ContactInfo {
  email: string
  location: string
  website: string
}

interface EditContactInfoFormProps {
  contactInfoData: ContactInfo
  onSave: (data: ContactInfo) => void
  onCancel: () => void
}

export default function EditContactInfoForm({ contactInfoData, onSave, onCancel }: EditContactInfoFormProps) {
  const [email, setEmail] = useState(contactInfoData.email || "")
  const [location, setLocation] = useState(contactInfoData.location || "")
  const [website, setWebsite] = useState(contactInfoData.website || "")

  useEffect(() => {
    // Update state if contactInfoData changes
    setEmail(contactInfoData.email || "")
    setLocation(contactInfoData.location || "")
    setWebsite(contactInfoData.website || "")
  }, [contactInfoData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Basic validation
    if (!email.trim() || !location.trim() || !website.trim()) {
      alert("Please fill in all fields.")
      return
    }
    const updatedData: ContactInfo = {
      email,
      location,
      website,
    }
    onSave(updatedData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., San Francisco, CA"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="e.g., yourportfolio.com"
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
