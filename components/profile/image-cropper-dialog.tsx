'use client'

import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'

interface ImageCropperDialogProps {
  imageSrc: string
  aspectRatio: number
  onCropComplete: (croppedImage: string) => void
  onClose: () => void
  title: string
  open: boolean
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues
    image.src = url
  })

async function getCroppedImg(imageSrc: string, pixelCrop: { x: number; y: number; width: number; height: number }, rotation = 0): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const rotationRad = rotation * (Math.PI / 180)
  const { width: imageWidth, height: imageHeight } = image

  // calculate the size of the canvas to fit the rotated image
  const sWidth = Math.abs(Math.cos(rotationRad) * imageWidth) + Math.abs(Math.sin(rotationRad) * imageHeight)
  const sHeight = Math.abs(Math.sin(rotationRad) * imageWidth) + Math.abs(Math.cos(rotationRad) * imageHeight)

  canvas.width = sWidth
  canvas.height = sHeight

  ctx.translate(sWidth / 2, sHeight / 2)
  ctx.rotate(rotationRad)
  ctx.drawImage(image, -imageWidth / 2, -imageHeight / 2)

  const data = ctx.getImageData(pixelCrop.x + (sWidth - imageWidth) / 2, pixelCrop.y + (sHeight - imageHeight) / 2, pixelCrop.width, pixelCrop.height)

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.clearRect(0, 0, pixelCrop.width, pixelCrop.height)
  ctx.putImageData(data, 0, 0)

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      if (file) {
        resolve(URL.createObjectURL(file))
      }
    }, 'image/jpeg')
  })
}

export const ImageCropperDialog: React.FC<ImageCropperDialogProps> = ({
  imageSrc,
  aspectRatio,
  onCropComplete,
  onClose,
  title,
  open,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null)

  const onCropChange = useCallback((crop: { x: number; y: number }) => {
    setCrop(crop)
  }, [])

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom)
  }, [])

  const onRotationChange = useCallback((rotation: number) => {
    setRotation(rotation)
  }, [])

  const onCropAreaComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleSave = useCallback(async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
        onCropComplete(croppedImage)
        onClose()
      } catch (e) {
        console.error(e)
      }
    }
  }, [imageSrc, croppedAreaPixels, rotation, onCropComplete, onClose])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[500px] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="relative flex-1 min-h-0">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspectRatio}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onRotationChange={onRotationChange}
            onCropComplete={onCropAreaComplete}
            showGrid={true}
            restrictPosition={false}
          />
        </div>
        <div className="flex flex-col gap-4 p-4 border-t">
          <div className="flex items-center gap-4">
            <Label htmlFor="zoom-slider" className="w-16">Zoom</Label>
            <Slider
              id="zoom-slider"
              min={1}
              max={3}
              step={0.1}
              value={[zoom]}
              onValueChange={([val]) => setZoom(val)}
              className="flex-1"
            />
            <Button variant="ghost" size="icon" onClick={() => setZoom(prev => Math.max(1, prev - 0.1))}><ZoomOut className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" onClick={() => setZoom(prev => Math.min(3, prev + 0.1))}><ZoomIn className="w-4 h-4" /></Button>
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="rotation-slider" className="w-16">Rotation</Label>
            <Slider
              id="rotation-slider"
              min={0}
              max={360}
              step={1}
              value={[rotation]}
              onValueChange={([val]) => setRotation(val)}
              className="flex-1"
            />
            <Button variant="ghost" size="icon" onClick={() => setRotation(0)}><RotateCcw className="w-4 h-4" /></Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
