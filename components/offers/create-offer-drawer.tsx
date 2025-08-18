"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X } from "lucide-react"

interface CreateOfferDrawerProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  title: string
  seller: string
  location: string
  category: string
  condition: string
  price: string
  description: string
  deliveryOptions: string[]
  contactInfo: string
  photos: string[] // Placeholder for photo URLs
}

const offerConditions = ["New", "Used - Like New", "Used - Good", "Used - Fair"]
const categories = ["Electronics", "Home Goods", "Vehicles", "Services", "Apparel", "Books", "Other"]
const deliveryOptions = ["Local Pickup", "Shipping", "Delivery"]

export function CreateOfferDrawer({ isOpen, onClose }: CreateOfferDrawerProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    seller: "",
    location: "",
    category: "",
    condition: "",
    price: "",
    description: "",
    deliveryOptions: [],
    contactInfo: "",
    photos: [],
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.title.trim()) newErrors.title = "Offer title is required"
    if (!formData.seller.trim()) newErrors.seller = "Seller name is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.condition) newErrors.condition = "Condition is required"
    if (!formData.price.trim()) newErrors.price = "Price is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (formData.deliveryOptions.length === 0) newErrors.deliveryOptions = "At least one delivery option is required"
    if (!formData.contactInfo.trim()) newErrors.contactInfo = "Contact information is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleListChange = (listName: keyof FormData, index: number, value: string) => {
    const list = [...(formData[listName] as string[])]
    list[index] = value
    setFormData({ ...formData, [listName]: list })
  }

  const handleAddListItem = (listName: keyof FormData) => {
    setFormData({ ...formData, [listName]: [...(formData[listName] as string[]), ""] })
  }

  const handleRemoveListItem = (listName: keyof FormData, index: number) => {
    const list = [...(formData[listName] as string[])]
    list.splice(index, 1)
    setFormData({ ...formData, [listName]: list })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset form and close drawer
      setFormData({
        title: "",
        seller: "",
        location: "",
        category: "",
        condition: "",
        price: "",
        description: "",
        deliveryOptions: [],
        contactInfo: "",
        photos: [],
      })
      setErrors({})
      onClose()

      console.log("Offer created:", formData)
    } catch (error) {
      console.error("Error creating offer:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        title: "",
        seller: "",
        location: "",
        category: "",
        condition: "",
        price: "",
        description: "",
        deliveryOptions: [],
        contactInfo: "",
        photos: [],
      })
      setErrors({})
      onClose()
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto p-4 sm:p-6">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">Create a New Offer</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-gray-600 mb-6">Fill in the details for your offer.</p>

              {/* Offer Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Offer Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Vintage Camera, Used Bicycle"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>

              {/* Seller Name */}
              <div className="space-y-2">
                <Label htmlFor="seller">
                  Seller Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="seller"
                  value={formData.seller}
                  onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                  placeholder="e.g., John Doe, Tech Gadgets Store"
                  className={errors.seller ? "border-red-500" : ""}
                />
                {errors.seller && <p className="text-sm text-red-500">{errors.seller}</p>}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., San Francisco, CA"
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
              </div>

              {/* Category & Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">
                    Condition <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => setFormData({ ...formData, condition: value })}
                  >
                    <SelectTrigger className={errors.condition ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {offerConditions.map((cond) => (
                        <SelectItem key={cond} value={cond}>
                          {cond}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.condition && <p className="text-sm text-red-500">{errors.condition}</p>}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., $150, Negotiable"
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
              </div>

              {/* Offer Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Offer Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a detailed description of the item or service."
                  className={`min-h-[150px] ${errors.description ? "border-red-500" : ""}`}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>

              {/* Delivery Options */}
              <div className="space-y-2">
                <Label>
                  Delivery Options <span className="text-red-500">*</span>
                </Label>
                {deliveryOptions.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`delivery-${option}`}
                      checked={formData.deliveryOptions.includes(option)}
                      onChange={(e) => {
                        const newOptions = e.target.checked
                          ? [...formData.deliveryOptions, option]
                          : formData.deliveryOptions.filter((item) => item !== option)
                        setFormData({ ...formData, deliveryOptions: newOptions })
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Label htmlFor={`delivery-${option}`}>{option}</Label>
                  </div>
                ))}
                {errors.deliveryOptions && <p className="text-sm text-red-500">{errors.deliveryOptions}</p>}
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <Label htmlFor="contactInfo">
                  Contact Information <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactInfo"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  placeholder="e.g., email@example.com or (123) 456-7890"
                  className={errors.contactInfo ? "border-red-500" : ""}
                />
                {errors.contactInfo && <p className="text-sm text-red-500">{errors.contactInfo}</p>}
              </div>

              {/* Photos (Simplified for now, can integrate PhotoUpload later) */}
              <div className="space-y-2">
                <Label htmlFor="photos">Photos (URLs)</Label>
                {formData.photos.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={item}
                      onChange={(e) => handleListChange("photos", index, e.target.value)}
                      placeholder="Enter photo URL"
                    />
                    {formData.photos.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveListItem("photos", index)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddListItem("photos")}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Photo URL
                </Button>
              </div>
            </CardContent>
          </Card>

          <SheetFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[100px] w-full sm:w-auto">
              {isSubmitting ? "Creating..." : "Create Offer"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
