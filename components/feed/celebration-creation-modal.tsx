"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  PartyPopper,
  Briefcase,
  GraduationCap,
  Trophy,
  Star,
  TrendingUp,
  BookOpen,
  Award,
  ArrowLeft,
  Camera,
} from "lucide-react"
import { usePostStore } from "@/lib/post-store"
import { useCelebrationStore, type CelebrationType } from "@/lib/celebration-store"

interface CelebrationCreationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const celebrationIcons = {
  project_launch: PartyPopper,
  work_anniversary: Briefcase,
  new_position: TrendingUp,
  educational_milestone: BookOpen,
  new_certification: Award,
  achievement: Trophy,
  promotion: TrendingUp,
  graduation: GraduationCap,
}

export function CelebrationCreationModal({ open, onOpenChange }: CelebrationCreationModalProps) {
  const { setCelebration, selectPostType } = usePostStore()
  const {
    celebrationData,
    availableTypes,
    setCelebrationType,
    setSelectedImage,
    setCelebrationDescription,
    resetCelebration,
    getCelebrationTypeData,
  } = useCelebrationStore()

  const [step, setStep] = useState<"type" | "image" | "details">("type")

  const handleTypeSelect = (type: CelebrationType) => {
    setCelebrationType(type)
    setStep("image")
  }

  const handleImageSelect = (image: string) => {
    setSelectedImage(image)
    setStep("details")
  }

  const handleSave = () => {
    if (celebrationData.type && celebrationData.selectedImage) {
      setCelebration({
        type: celebrationData.type,
        image: celebrationData.selectedImage,
      })
      selectPostType("celebrate")
      onOpenChange(false)
      resetCelebration()
      setStep("type")
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
    resetCelebration()
    setStep("type")
  }

  const handleBack = () => {
    if (step === "image") {
      setStep("type")
    } else if (step === "details") {
      setStep("image")
    }
  }

  const typeData = celebrationData.type ? getCelebrationTypeData(celebrationData.type) : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-3">
            {step !== "type" && (
              <Button variant="ghost" size="sm" onClick={handleBack} className="h-8 w-8 p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle>
              {step === "type" && "Choose Celebration Type"}
              {step === "image" && "Select Image"}
              {step === "details" && "Celebration Details"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] px-6">
          <div className="space-y-6 pb-6">
            {/* Step 1: Type Selection */}
            {step === "type" && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">What are you celebrating?</p>
                <div className="grid grid-cols-1 gap-3">
                  {availableTypes.map((option) => {
                    const IconComponent = celebrationIcons[option.id] || Star
                    return (
                      <Card
                        key={option.id}
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => handleTypeSelect(option.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{option.title}</h3>
                              <p className="text-sm text-muted-foreground">{option.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Image Selection */}
            {step === "image" && typeData && (
              <div className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {typeData.title}
                  </Badge>
                  <p className="text-sm text-muted-foreground">Choose an image for your celebration</p>
                </div>

                {/* Selected Image Preview */}
                {celebrationData.selectedImage && (
                  <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={celebrationData.selectedImage || "/placeholder.svg"}
                      alt="Selected celebration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {typeData.defaultImages.map((image, index) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all ${
                        celebrationData.selectedImage === image
                          ? "ring-2 ring-primary"
                          : "hover:ring-1 hover:ring-muted-foreground"
                      }`}
                      onClick={() => handleImageSelect(image)}
                    >
                      <CardContent className="p-2">
                        <div className="aspect-video bg-muted rounded overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Option ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Custom Image Upload */}
                <Card className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm font-medium">Upload Custom Image</p>
                      <p className="text-xs text-muted-foreground">Choose your own celebration image</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Details */}
            {step === "details" && typeData && (
              <div className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {typeData.title}
                  </Badge>
                  <p className="text-sm text-muted-foreground">Add details to your celebration</p>
                </div>

                {/* Preview */}
                <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={celebrationData.selectedImage || ""}
                    alt="Celebration preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <Separator />

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={celebrationData.description}
                    onChange={(e) => setCelebrationDescription(e.target.value)}
                    placeholder="Share what you're celebrating..."
                    rows={4}
                  />
                </div>

                {/* Suggested Descriptions */}
                <div className="space-y-2">
                  <Label className="text-sm">Suggested descriptions:</Label>
                  <div className="space-y-2">
                    {typeData.suggestedDescriptions.slice(0, 3).map((suggestion, index) => (
                      <Card
                        key={index}
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setCelebrationDescription(suggestion)}
                      >
                        <CardContent className="p-3">
                          <p className="text-sm">{suggestion}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 pt-0">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          {step === "details" && (
            <Button onClick={handleSave} disabled={!celebrationData.selectedImage}>
              Create Celebration
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
