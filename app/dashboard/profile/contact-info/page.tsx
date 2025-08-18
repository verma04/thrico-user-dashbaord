"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from 'lucide-react'
import Link from "next/link"
import EditContactInfoForm from "@/components/profile/contact-info/edit-contact-info-form"


interface ContactInfo {
  email: string
  location: string
  website: string
}

export default function ContactInfoPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "sarah@example.com",
    location: "San Francisco, CA",
    website: "sarahchen.design",
  })

  const handleSaveContactInfo = (updatedInfo: ContactInfo) => {
    setContactInfo(updatedInfo)
    // In a real app, you'd send this to a backend
    alert("Contact info updated successfully!")
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Edit Contact Information</CardTitle>
          <Settings className="w-6 h-6 text-gray-600" />
        </CardHeader>
        <CardContent className="space-y-6">
          <EditContactInfoForm
            contactInfoData={contactInfo}
            onSave={handleSaveContactInfo}
            onCancel={() => {
              // Optionally navigate back or show a message
              alert("Edit cancelled.")
            }}
          />
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-end">
        <Link href="/">
          <Button variant="outline">Back to Profile</Button>
        </Link>
      </div>
    </div>
  )
}
