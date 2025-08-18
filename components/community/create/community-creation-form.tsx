"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Camera, Info, Globe, Lock, Laptop, MapPin, RefreshCw, Lightbulb } from "lucide-react"
import { CommunityPreview } from "./community-preview"
import { ImageCropper } from "./image-cropper"
import { toast } from "sonner"

interface FormData {
  title: string
  tagline: string
  description: string
  privacy: string
  communityType: string
  joiningTerms: string
  requireAdminApprovalForPosts: boolean
  allowMemberInvites: boolean
  enableEvents: boolean
  enableRatingsAndReviews: boolean
}

interface CommunityCreationFormProps {
  initialValues: Partial<FormData>
  loading: boolean
  onFinish: (values: FormData) => void
  cover: string | undefined
  setCover: (cover: string) => void
}

export function CommunityCreationForm({
  initialValues,
  loading,
  onFinish,
  cover,
  setCover,
}: CommunityCreationFormProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [cropModalVisible, setCropModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<FormData>>(initialValues)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setCropModalVisible(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = (croppedImage: any, croppedUrl: string) => {
    setCover(croppedImage)
    setImageUrl(croppedUrl)
    setCropModalVisible(false)
    setSelectedImage(null)
    toast.success("Cover image updated successfully!")
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFinish(formData as FormData)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Cover Image */}
              <div className="space-y-2">
                <div className="relative">
                  <div className="aspect-[3/1] overflow-hidden rounded-lg bg-gray-100 border-2 border-dashed border-gray-300">
                    <Image
                      src={imageUrl || "https://cdn.thrico.network/defaultEventCover.png"}
                      alt="Community cover"
                      width={600}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => document.getElementById("cover-upload")?.click()}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Update Cover
                    </Button>
                    <input
                      id="cover-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Recommended size: 1200 x 400px. Max file size: 5MB. Click to crop after upload.
                </p>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter community name"
                  maxLength={50}
                  value={formData.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
                <p className="text-xs text-gray-500">This will be the main name of your community.</p>
              </div>

              {/* Tagline */}
              <div className="space-y-2">
                <Label htmlFor="tagline" className="flex items-center gap-2">
                  Tagline
                  <Info className="w-4 h-4 text-gray-400" />
                </Label>
                <Input
                  id="tagline"
                  placeholder="Enter a catchy headline for your community"
                  maxLength={100}
                  value={formData.tagline || ""}
                  onChange={(e) => handleInputChange("tagline", e.target.value)}
                />
                <p className="text-xs text-gray-500">A brief tagline that describes your community's purpose.</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what your community is about"
                  maxLength={300}
                  rows={4}
                  value={formData.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Tell potential members what your community is about and why they should join.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Settings */}
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Privacy Settings */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">
                  Privacy Settings <span className="text-red-500">*</span>
                </h4>
                <RadioGroup value={formData.privacy} onValueChange={(value) => handleInputChange("privacy", value)}>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="PUBLIC" id="public" />
                    <Label htmlFor="public" className="flex items-center gap-3 cursor-pointer">
                      <Globe className="w-5 h-5" />
                      <div>
                        <div className="font-medium">Public</div>
                        <div className="text-sm text-gray-500">Anyone can see and join this community</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="PRIVATE" id="private" />
                    <Label htmlFor="private" className="flex items-center gap-3 cursor-pointer">
                      <Lock className="w-5 h-5" />
                      <div>
                        <div className="font-medium">Private</div>
                        <div className="text-sm text-gray-500">Only invited members can see and join</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Community Type */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">
                  Community Type <span className="text-red-500">*</span>
                </h4>
                <RadioGroup
                  value={formData.communityType}
                  onValueChange={(value) => handleInputChange("communityType", value)}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="VIRTUAL" id="virtual" />
                    <Label htmlFor="virtual" className="flex items-center gap-3 cursor-pointer">
                      <Laptop className="w-5 h-5" />
                      <div>
                        <div className="font-medium">Virtual</div>
                        <div className="text-sm text-gray-500">Online-only community</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="INPERSON" id="inperson" />
                    <Label htmlFor="inperson" className="flex items-center gap-3 cursor-pointer">
                      <MapPin className="w-5 h-5" />
                      <div>
                        <div className="font-medium">In Person</div>
                        <div className="text-sm text-gray-500">Meets physically at a location</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="HYBRID" id="hybrid" />
                    <Label htmlFor="hybrid" className="flex items-center gap-3 cursor-pointer">
                      <RefreshCw className="w-5 h-5" />
                      <div>
                        <div className="font-medium">Hybrid</div>
                        <div className="text-sm text-gray-500">Both online and in-person</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Joining Terms */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">
                  Joining Terms <span className="text-red-500">*</span>
                </h4>
                <RadioGroup
                  value={formData.joiningTerms}
                  onValueChange={(value) => handleInputChange("joiningTerms", value)}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="ANYONE_CAN_JOIN" id="anyone" />
                    <Label htmlFor="anyone" className="cursor-pointer">
                      <div className="font-medium">Anyone Can Join</div>
                      <div className="text-sm text-gray-500">Anyone can join this community directly</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="ADMIN_ONLY_ADD" id="admin-only" />
                    <Label htmlFor="admin-only" className="cursor-pointer">
                      <div className="font-medium">Admin Only Add</div>
                      <div className="text-sm text-gray-500">Only admins can add members to this community</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Additional Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Require admin approval for new posts</div>
                  <div className="text-sm text-gray-500">
                    All posts will need to be approved by an admin before being published
                  </div>
                </div>
                <Switch
                  checked={formData.requireAdminApprovalForPosts}
                  onCheckedChange={(checked) => handleInputChange("requireAdminApprovalForPosts", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Allow members to invite others</div>
                  <div className="text-sm text-gray-500">Members can invite friends to join the community</div>
                </div>
                <Switch
                  checked={formData.allowMemberInvites}
                  onCheckedChange={(checked) => handleInputChange("allowMemberInvites", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Enable community events</div>
                  <div className="text-sm text-gray-500">Allow creating and managing events within the community</div>
                </div>
                <Switch
                  checked={formData.enableEvents}
                  onCheckedChange={(checked) => handleInputChange("enableEvents", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Enable community ratings and reviews</div>
                  <div className="text-sm text-gray-500">Allow members to rate and review community content</div>
                </div>
                <Switch
                  checked={formData.enableRatingsAndReviews}
                  onCheckedChange={(checked) => handleInputChange("enableRatingsAndReviews", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Preview & Tips */}
      <div className="space-y-6">
        <div className="sticky top-8">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <CommunityPreview imageUrl={imageUrl} formData={formData} />

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Tips for Success
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <p className="text-sm">Choose a clear, descriptive name that reflects your community's purpose</p>
              </div>
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <p className="text-sm">Add a compelling headline that captures interest</p>
              </div>
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <p className="text-sm">Upload a high-quality cover image that represents your community</p>
              </div>
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <p className="text-sm">Write a detailed description explaining the benefits of joining</p>
              </div>
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <p className="text-sm">Consider your privacy settings carefully based on your community goals</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Image Cropper Modal */}
      {selectedImage && (
        <ImageCropper
          cropModalVisible={cropModalVisible}
          image={selectedImage}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            setCropModalVisible(false)
            setSelectedImage(null)
          }}
        />
      )}
    </div>
  )
}
