"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { X, GripVertical, Camera, MapPin, Info } from 'lucide-react'
import { GooglePlacesInput } from "../google-places-input"
import { useAddListing } from "../grapqhl/action/listing"

const categories = [
  "Electronics & Appliances", "Vehicles", "Real Estate", "Home & Furniture", "Fashion & Beauty",
  "Sports, Hobbies & Books", "Pets", "Jobs", "Services", "Education & Classes", "Events",
  "Matrimonial", "Health & Fitness", "Travel & Tourism", "Community", "Tools & Equipment",
  "Baby & Kids", "Art & Antiques", "Industrial Goods", "Agriculture"
]

const conditions = [
  { value: "NEW", label: "New", description: "Brand new, unused, unopened, undamaged item" },
  { value: "USED_LIKE_NEW", label: "Used - Like New", description: "Looks and works like new, no visible wear" },
  { value: "USED_LIKE_GOOD", label: "Used - Good", description: "Minor signs of wear, fully functional" },
  { value: "USED_LIKE_FAIR", label: "Used - Fair", description: "Noticeable wear, but still works as intended" }
]

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3, "Title must be at least 3 characters").required("Required"),
  description: Yup.string().min(10, "Description must be at least 10 characters").required("Required"),
  price: Yup.number().typeError("Please enter a valid price").required("Required"),
  condition: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  media: Yup.array().min(1, "Please upload at least one image").max(4, "You can only upload up to 4 images")
})

export function CreateListingForm({ onSubmit, loading = false, onCancel }) {


  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  // Wrap the original onSubmit to log values


  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        price: "",
        condition: "Good",
        category: "",
        location: "",
        latitude: undefined,
        longitude: undefined,
        media: []
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="xl:col-span-2">
            <Form id="listing-form" className="space-y-6">
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
                              onClick={() => {
                                const newMedia = values.media.filter((_, i) => i !== index)
                                setFieldValue("media", newMedia)
                                setImagePreviews(imagePreviews.filter((_, i) => i !== index))
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="absolute top-1 left-1 bg-black/50 text-white rounded p-1">
                              <GripVertical className="w-3 h-3" />
                            </div>
                          </div>
                        ))}
                        {values.media.length < 4 && (
                          <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400">
                            <div className="text-center">
                              <Camera className="w-6 h-6 mx-auto text-gray-400" />
                              <span className="text-xs text-gray-500 mt-1">Upload</span>
                            </div>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={e => {
                                const files = Array.from(e.target.files || [])
                                if (values.media.length + files.length > 4) return
                                setFieldValue("media", [...values.media, ...files])
                                files.forEach(file => {
                                  const reader = new FileReader()
                                  reader.onload = (ev) => {
                                    setImagePreviews(prev => [...prev, ev.target?.result as string])
                                  }
                                  reader.readAsDataURL(file)
                                })
                              }}
                            />
                          </label>
                        )}
                      </div>
                      <ErrorMessage name="media" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Listing Title *</Label>
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      placeholder="Enter listing title"
                      maxLength={100}
                      className={errors.title && touched.title ? "border-red-500" : ""}
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>
                        <ErrorMessage name="title" />
                        {!errors.title && "This will be the main title of your marketplace listing"}
                      </span>
                      <span>{values.title.length}/100</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <GooglePlacesInput
                      value={values.location}
                      onChange={(loc) => {
                        setFieldValue("location", loc.address)
                        setFieldValue("latitude", loc.latitude)
                        setFieldValue("longitude", loc.longitude)
                      }}
                      error={!!(errors.location && touched.location)}
                      placeholder="Enter your location"
                    />
                    <ErrorMessage name="location" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Field
                      as={Textarea}
                      id="description"
                      name="description"
                      placeholder="Describe your listing (features, condition, etc.)"
                      maxLength={300}
                      rows={4}
                      className={errors.description && touched.description ? "border-red-500" : ""}
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>
                        <ErrorMessage name="description" />
                        {!errors.description && "Describe your listing in detail"}
                      </span>
                      <span>{values.description.length}/300</span>
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
                      value={values.condition}
                      onValueChange={value => setFieldValue("condition", value)}
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
                    <ErrorMessage name="condition" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Category */}
                  <div>
                    <Label>Category *</Label>
                    <Select
                      value={values.category}
                      onValueChange={value => setFieldValue("category", value)}
                    >
                      <SelectTrigger className={errors.category && touched.category ? "border-red-500" : ""}>
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
                    <ErrorMessage name="category" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Price */}
                  <div>
                    <Label htmlFor="price">Price (₹) *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">₹</span>
                      <Field
                        as={Input}
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Enter price"
                        className={`pl-8 ${errors.price && touched.price ? "border-red-500" : ""}`}
                        min="0"
                        max="1000000"
                      />
                    </div>
                    <ErrorMessage name="price" component="p" className="text-red-500 text-sm mt-1" />
                  </div>
                </CardContent>
              </Card>

      
            </Form>
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
                    {values.title || "Your listing title"}
                  </h3>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{values.price || "0"}
                  </p>
                  {values.condition && (
                    <Badge variant="outline">{values.condition}</Badge>
                  )}
                  <p className="text-sm text-gray-600">
                    {values.description || "Your description will appear here"}
                  </p>
                  {values.location && (
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {values.location}
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
      )}
    </Formik>
  )
}
