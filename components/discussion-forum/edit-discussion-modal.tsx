"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

interface Discussion {
  id: number
  title: string
  excerpt: string
  category: string
}

interface EditDiscussionModalProps {
  discussion: Discussion
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  title: string
  content: string
  category: string
}

const categories = [
  { id: "general", name: "General" },
  { id: "technology", name: "Technology" },
  { id: "career", name: "Career" },
  { id: "help", name: "Help" },
  { id: "business", name: "Business" },
]

export function EditDiscussionModal({ discussion, isOpen, onClose }: EditDiscussionModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    category: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen && discussion) {
      setFormData({
        title: discussion.title,
        content: discussion.excerpt,
        category: discussion.category.toLowerCase(),
      })
    }
  }, [isOpen, discussion])

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Please enter a title for your post"
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters"
    } else if (formData.title.length > 100) {
      newErrors.title = "Title cannot exceed 100 characters"
    }

    if (!formData.content.trim()) {
      newErrors.content = "Please enter content for your post"
    } else if (formData.content.length < 10) {
      newErrors.content = "Content must be at least 10 characters"
    } else if (formData.content.length > 500) {
      newErrors.content = "Content cannot exceed 500 characters"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Discussion updated:", { id: discussion.id, ...formData })
      onClose()
    } catch (error) {
      console.error("Error updating discussion:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setErrors({})
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        {" "}
        {/* Responsive max-width and padding */}
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Discussion</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {" "}
              {/* Added space-y for consistent spacing */}
              {/* Title Input */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Give your post a title"
                  className={errors.title ? "border-red-500" : ""}
                  maxLength={100}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>
              {/* Content Input */}
              <div className="space-y-2">
                <Label htmlFor="content">
                  Content <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="What would you like to discuss?"
                  className={`min-h-[120px] ${errors.content ? "border-red-500" : ""}`}
                  maxLength={500}
                />
                <div className="flex justify-between items-center">
                  <div>{errors.content && <p className="text-sm text-red-500">{errors.content}</p>}</div>
                  <p className="text-sm text-gray-500">{formData.content.length}/500</p>
                </div>
              </div>
              {/* Category Selector */}
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2">
            {" "}
            {/* Responsive footer buttons */}
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
              {isSubmitting ? "Updating..." : "Update Discussion"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
