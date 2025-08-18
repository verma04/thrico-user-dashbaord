"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Plus, Trash2, Share2 } from 'lucide-react'
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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

import { v4 as uuidv4 } from "uuid"
import AddSocialLinkForm from "@/components/profile/social-links/add-social-link-form"
import EditSocialLinkForm from "@/components/profile/social-links/edit-social-link-form"

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string; // Optional: for custom icons if needed
}

export default function SocialLinksListPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      id: "sl1",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/sarahchen",
      icon: "/placeholder.svg?height=24&width=24",
    },
    {
      id: "sl2",
      platform: "GitHub",
      url: "https://github.com/sarahchen",
      icon: "/placeholder.svg?height=24&width=24",
    },
    {
      id: "sl3",
      platform: "Twitter",
      url: "https://twitter.com/sarahchen_design",
      icon: "/placeholder.svg?height=24&width=24",
    },
  ])

  const [showAddSocialLinkModal, setShowAddSocialLinkModal] = useState(false)
  const [showEditSocialLinkModal, setShowEditSocialLinkModal] = useState(false)
  const [currentSocialLinkToEdit, setCurrentSocialLinkToEdit] = useState<SocialLink | null>(null)
  const [socialLinkToDeleteId, setSocialLinkToDeleteId] = useState<string | null>(null)

  const handleAddSocialLink = (newLink: Omit<SocialLink, 'id'>) => {
    setSocialLinks([...socialLinks, { ...newLink, id: uuidv4() }])
    setShowAddSocialLinkModal(false)
  }

  const handleEditSocialLink = (updatedLink: SocialLink) => {
    setSocialLinks(socialLinks.map((link) => (link.id === updatedLink.id ? updatedLink : link)))
    setShowEditSocialLinkModal(false)
    setCurrentSocialLinkToEdit(null)
  }

  const handleDeleteSocialLink = () => {
    if (socialLinkToDeleteId) {
      setSocialLinks(socialLinks.filter((link) => link.id !== socialLinkToDeleteId))
      setSocialLinkToDeleteId(null)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">My Social Links</CardTitle>
          <Dialog open={showAddSocialLinkModal} onOpenChange={setShowAddSocialLinkModal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add New Link
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Social Link</DialogTitle>
              </DialogHeader>
              <AddSocialLinkForm onSave={handleAddSocialLink} onCancel={() => setShowAddSocialLinkModal(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-6">
          {socialLinks.map((link) => (
            <div key={link.id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {/* Using a generic placeholder for the icon, as Lucide doesn't have all social icons directly */}
                <img src={link.icon || "/placeholder.svg?height=24&width=24&query=social-icon"} alt={link.platform} className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{link.platform}</h3>
                <p className="text-gray-600 break-all">{link.url}</p>
              </div>
              <div className="flex space-x-2">
                <Dialog
                  open={showEditSocialLinkModal && currentSocialLinkToEdit?.id === link.id}
                  onOpenChange={(open) => {
                    setShowEditSocialLinkModal(open)
                    if (!open) setCurrentSocialLinkToEdit(null)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setCurrentSocialLinkToEdit(link)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  {currentSocialLinkToEdit?.id === link.id && (
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit Social Link</DialogTitle>
                      </DialogHeader>
                      <EditSocialLinkForm
                        socialLinkData={currentSocialLinkToEdit}
                        onSave={handleEditSocialLink}
                        onCancel={() => {
                          setShowEditSocialLinkModal(false)
                          setCurrentSocialLinkToEdit(null)
                        }}
                      />
                    </DialogContent>
                  )}
                </Dialog>
                <AlertDialog
                  open={socialLinkToDeleteId === link.id}
                  onOpenChange={(open) => {
                    if (!open) setSocialLinkToDeleteId(null)
                  }}
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setSocialLinkToDeleteId(link.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your social link.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteSocialLink}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
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
