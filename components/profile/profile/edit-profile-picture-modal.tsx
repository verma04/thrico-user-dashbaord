'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Edit } from 'lucide-react'
import { ImageCropperDialog } from '../image-cropper-dialog'
import { useUpdateProfileAvatar } from '@/components/grapqhl/queries'

interface EditProfilePictureModalProps {
  currentImage: string
  onSave: (newImage: string) => void
}

export const EditProfilePictureModal: React.FC<EditProfilePictureModalProps> = ({ currentImage, onSave }) => {
  const [update, { loading }] = useUpdateProfileAvatar({
    onCompleted: (data) => {
      if (data.updateProfileAvatar?.avatar) {
        onSave(data.updateProfileAvatar?.avatar)
        setOpen(false)
        setImageToCrop(null)
        setCroppedImage(null)
      }
    },
    onError: (error) => {
      console.error("Error updating profile picture:", error)
    },
  })

  const [open, setOpen] = useState(false)
  const [imageToCrop, setImageToCrop] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImageToCrop(reader.result as string)
      })
      reader.readAsDataURL(event.target.files[0])
    }
  }

  const handleCropComplete = (cropped: string) => {
   update( { avatar: cropped } )
    // Optionally close the cropper dialog if needed:
    // setImageToCrop(null)
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
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin w-6 h-6 mr-2" />
              <span>Saving...</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="picture" className="text-right">
                  Upload
                </Label>
                <Input id="picture" type="file" className="col-span-3" onChange={handleFileChange} accept="image/*" />
              </div>
              {imageToCrop && (
                <ImageCropperDialog
                  open={true}
                  imageSrc={imageToCrop}
                  aspectRatio={1 / 1}
                  onCropComplete={handleCropComplete}
                  onClose={() => {
                    setImageToCrop(null)
                    setCroppedImage(null)
                  }}
                  title="Crop Profile Picture"
                />
              )}
            </>
          )}
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
