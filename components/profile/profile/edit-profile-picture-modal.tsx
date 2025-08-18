'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Edit } from 'lucide-react'
import { ImageCropperDialog } from '../image-cropper-dialog'

interface EditProfilePictureModalProps {
  currentImage: string
  onSave: (newImage: string) => void
}

export const EditProfilePictureModal: React.FC<EditProfilePictureModalProps> = ({ currentImage, onSave }) => {
  const [open, setOpen] = useState(false)
  const [imageToCrop, setImageToCrop] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImageToCrop(reader.result as string)
      })
      reader.readAsDataURL(event.target.files[0])
    }
  }

  const handleCropComplete = (croppedImage: string) => {
    onSave(croppedImage)
    setImageToCrop(null) // Clear image after saving
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile Picture</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="picture" className="text-right">
              Upload
            </Label>
            <Input id="picture" type="file" className="col-span-3" onChange={handleFileChange} accept="image/*" />
          </div>
          {imageToCrop && (
            <ImageCropperDialog
              open={true} // Always open when imageToCrop is set
              imageSrc={imageToCrop}
              aspectRatio={1 / 1} // Fixed aspect ratio for profile picture
              onCropComplete={handleCropComplete}
              onClose={() => setImageToCrop(null)} // Close cropper
              title="Crop Profile Picture"
            />
          )}
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
