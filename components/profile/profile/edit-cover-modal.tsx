'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

import { Edit } from 'lucide-react'
import { ImageCropperDialog } from '../image-cropper-dialog'
import { useUpdateProfileCover } from '@/components/grapqhl/queries'
import { set } from 'date-fns'

interface EditCoverModalProps {
  currentImage: string
  onSave: (newImage: string) => void
}

export const EditCoverModal: React.FC<EditCoverModalProps> = ({ currentImage, onSave }) => {
  const [update , {loading}] = useUpdateProfileCover({
    onCompleted: (data) => {
      if (data.updateProfileCover?.cover) {
        onSave(data.updateProfileCover.cover)
        setOpen(false)
        setImageToCrop(null)
        setCroppedImage(null)
      }
    },
    onError: (error) => {
      console.error("Error updating cover:", error)
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

  // Called when cropping is done, but not yet saved
const handleCropComplete = (cropped: string) => {


  update( { cover: cropped } )
  // Optionally close the cropper dialog if needed:
  // setImageToCrop(null)
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
                  aspectRatio={3 / 1}
                  onCropComplete={handleCropComplete}
                  onClose={() => {
                    setImageToCrop(null)
                    setCroppedImage(null)
                  }}
                  title="Crop Cover Photo"
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
