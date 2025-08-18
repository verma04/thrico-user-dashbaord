"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Upload, X, GripVertical, Camera, MapPin, Info } from 'lucide-react'


const categories = [
  "Electronics & Appliances",
  "Vehicles", 
  "Real Estate",
  "Home & Furniture",
  "Fashion & Beauty",
  "Sports, Hobbies & Books",
  "Pets",
  "Jobs",
  "Services",
  "Education & Classes",
  "Events",
  "Matrimonial",
  "Health & Fitness",
  "Travel & Tourism",
  "Community",
  "Tools & Equipment",
  "Baby & Kids",
  "Art & Antiques",
  "Industrial Goods",
  "Agriculture"
]

const conditions = [
  { value: "New", label: "New", description: "Brand new, unused, unopened, undamaged item" },
  { value: "Like New", label: "Used - Like New", description: "Looks and works like new, no visible wear" },
  { value: "Good", label: "Used - Good", description: "Minor signs of wear, fully functional" },
  { value: "Fair", label: "Used - Fair", description: "Noticeable wear, but still works as intended" }
]

interface CreateListingFormProps {
  onSubmit: (data: CreateListingFormData) => void
  loading?: boolean
  onCancel?: () => void
}

export function CreateListingForm({ onSubmit, loading = false, onCancel }: CreateListingFormProps) {
  const [formData, setFormData] = useState<Partial<CreateListingFormData>>({
    condition: "Good",
    category: ""
  })
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (images.length + files.length > 4) {
      setErrors({ ...errors, images: "You can only upload up to 4 images" })
      return
    }

    const newImages = [...images, ...files]
    setImages(newImages)

    // Create previews
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })

    setErrors({ ...errors, images: "" })
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setImages(newImages)
    setImagePreviews(newPreviews)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title || formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters"
    }
    if (!formData.description || formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }
    if (!formData.price || isNaN(Number(formData.price))) {
      newErrors.price = "Please enter a valid price"
    }
    if (!formData.condition) {
      newErrors.condition = "Please select a condition"
    }
    if (!formData.category) {
      newErrors.category = "Please select a category"
    }
    if (!formData.location) {
      newErrors.location = "Please enter a location"
    }
    if (images.length === 0) {
      newErrors.images = "Please upload at least one image"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        ...formData,
        images
      } as CreateListingFormData)
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Main Form */}
      <div className="xl:col-span-2">
        <form id="listing-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Upload */}
              <div>
                <Label>Images (Max 4)</Label>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute top-1 left-1 bg-black/50 text-white rounded p-1">
                          <GripVertical className="w-3 h-3" />
                        </div>
                      </div>
                    ))}
                    {images.length < 4 && (
                      <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400">
                        <div className="text-center">
                          <Camera className="w-6 h-6 mx-auto text-gray-400" />
                          <span className="text-xs text-gray-500 mt-1">Upload</span>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                </div>
              </div>

              {/* Title */}
              <div>
                <Label htmlFor="title">Listing Title *</Label>
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter listing title"
                  maxLength={100}
                  className={errors.title ? "border-red-500" : ""}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{errors.title || "This will be the main title of your marketplace listing"}</span>
                  <span>{formData.title?.length || 0}/100</span>
                </div>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="location"
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter your location"
                    className={`pl-10 ${errors.location ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your listing (features, condition, etc.)"
                  maxLength={300}
                  rows={4}
                  className={errors.description ? "border-red-500" : ""}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{errors.description || "Describe your listing in detail"}</span>
                  <span>{formData.description?.length || 0}/300</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Condition */}
              <div>
                <Label>Condition *</Label>
                <RadioGroup
                  value={formData.condition}
                  onValueChange={(value) => setFormData({ ...formData, condition: value as any })}
                  className="mt-2"
                >
                  {conditions.map((condition) => (
                    <div key={condition.value} className="flex items-start space-x-2">
                      <RadioGroupItem value={condition.value} id={condition.value} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={condition.value} className="font-medium">
                          {condition.label}
                        </Label>
                        <p className="text-sm text-gray-500">{condition.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                {errors.condition && <p className="text-red-500 text-sm mt-1">{errors.condition}</p>}
              </div>

              {/* Category */}
              <div>
                <Label>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price">Price (₹) *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">₹</span>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Enter price"
                    className={`pl-8 ${errors.price ? "border-red-500" : ""}`}
                    min="0"
                    max="1000000"
                  />
                </div>
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Preview & Tips */}
      <div className="space-y-6">
        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <p className="text-sm text-gray-500">See how your listing will appear to buyers</p>
          </CardHeader>
          <CardContent>
            {/* Preview Image */}
            <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
              {imagePreviews.length > 0 ? (
                <img
                  src={imagePreviews[0] || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-32 object-cover"
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center text-gray-400">
                  <Camera className="w-8 h-8" />
                </div>
              )}
            </div>

            {/* Preview Details */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">
                {formData.title || "Your listing title"}
              </h3>
              <p className="text-2xl font-bold text-green-600">
                ₹{formData.price || "0"}
              </p>
              {formData.condition && (
                <Badge variant="outline">{formData.condition}</Badge>
              )}
              <p className="text-sm text-gray-600">
                {formData.description || "Your description will appear here"}
              </p>
              {formData.location && (
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {formData.location}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Tips for Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Use a clear, descriptive title</li>
              <li>• Add high-quality photos from multiple angles</li>
              <li>• Include detailed condition information</li>
              <li>• Set a competitive price</li>
              <li>• Respond quickly to buyer inquiries</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
