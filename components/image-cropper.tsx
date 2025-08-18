"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Check, X } from "lucide-react"

interface ImageCropperProps {
  image: string
  onCropComplete: (croppedImage: any, croppedUrl: string) => void
  onCancel: () => void
  cropModalVisible: boolean
}

export function ImageCropper({ image, onCropComplete, onCancel, cropModalVisible }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState([1])
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

  const onCropCompleteCallback = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleDone = async () => {
    const croppedUrl = await getCroppedImg(image, croppedAreaPixels)
    const blob = await base64ToWebpBlob(croppedUrl)
    const croppedImage = new File([blob], "image.webp", { type: "image/webp" })

    if (croppedUrl) {
      onCropComplete(croppedImage, croppedUrl)
    }
  }

  return (
    <Dialog open={cropModalVisible} onOpenChange={onCancel}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
          <img src={image || "/placeholder.svg"} alt="Crop preview" className="w-full h-full object-contain" />
        </div>
        <div className="space-y-4">
          <div className="px-3">
            <Slider value={zoom} onValueChange={setZoom} max={3} min={1} step={0.1} className="w-full" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleDone}>
              <Check className="w-4 h-4 mr-2" />
              Crop
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const getCroppedImg = (imageSrc: string, pixelCrop: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.src = imageSrc
    image.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = pixelCrop?.width || 600
      canvas.height = pixelCrop?.height || 200
      const ctx = canvas.getContext("2d")

      if (!ctx) return reject("Canvas context not found")

      ctx.drawImage(
        image,
        pixelCrop?.x || 0,
        pixelCrop?.y || 0,
        pixelCrop?.width || 600,
        pixelCrop?.height || 200,
        0,
        0,
        pixelCrop?.width || 600,
        pixelCrop?.height || 200,
      )

      resolve(canvas.toDataURL("image/jpeg"))
    }
    image.onerror = reject
  })
}

function base64ToWebpBlob(base64: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = base64

    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext("2d")
      if (!ctx) return reject("Canvas context error")

      ctx.drawImage(img, 0, 0)
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject("Conversion to webp failed")
        }
      }, "image/webp")
    }

    img.onerror = (err) => reject(err)
  })
}
