'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Edit } from 'lucide-react'
import { ImageCropperDialog } from '../image-cropper-dialog'

interface EditCoverModalProps {
  currentImage: string
  onSave: (newImage: string) => void
}

export const EditCoverModal: React.FC<EditCoverModalProps> = ({ currentImage, onSave }) => {
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
        <Button variant="secondary" size="sm" className="absolute top-4 right-4">
          <Edit className="w-4 h-4 mr-2" />
          Edit Cover
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Cover Photo</DialogTitle>
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
              aspectRatio={3 / 1} // Example aspect ratio for cover photo
              onCropComplete={handleCropComplete}
              onClose={() => setImageToCrop(null)} // Close cropper
              title="Crop Cover Photo"
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
