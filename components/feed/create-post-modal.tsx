"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Eye, Globe, Users, Hash, Type, Sparkles, Camera, Plus, Heart, MessageCircle, Share } from "lucide-react"

interface CreatePostModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (postData: any) => void
}

const categories = [
  "Technology",
  "Business",
  "Design",
  "Marketing",
  "Career",
  "Education",
  "Health",
  "Lifestyle",
  "Discussion",
  "Jobs",
  "News",
  "Entertainment",
]

const suggestedTags = [
  "Technology",
  "AI",
  "WebDev",
  "React",
  "JavaScript",
  "Design",
  "UX",
  "UI",
  "Startup",
  "Career",
  "Remote",
  "Productivity",
  "Learning",
  "Innovation",
  "Business",
]

export function CreatePostModal({ open, onOpenChange, onSubmit }: CreatePostModalProps) {
  const [activeTab, setActiveTab] = useState("create")
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    privacy: "public",
    tags: [] as string[],
    images: [] as string[],
  })
  const [newTag, setNewTag] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.content.trim()) {
      newErrors.content = "Post content is required"
    }

    if (formData.content.length > 2000) {
      newErrors.content = "Content must be less than 2000 characters"
    }

    if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
      handleReset()
      onOpenChange(false)
    }
  }

  const handleReset = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      privacy: "public",
      tags: [],
      images: [],
    })
    setNewTag("")
    setErrors({})
    setActiveTab("create")
  }

  const handleCancel = () => {
    onOpenChange(false)
    handleReset()
  }

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file)
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, url],
        }))
      }
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = (imageToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== imageToRemove),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl  p-0 flex flex-col">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Create New Post
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create" className="gap-2">
                <Type className="h-4 w-4" />
                Create
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 overflow-auto">
            <TabsContent value="create" className="px-6 space-y-6 pb-6">
              {/* Author Info */}
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">You</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Select
                      value={formData.privacy}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, privacy: value }))}
                    >
                      <SelectTrigger className="w-auto h-auto p-1 border-0 bg-transparent">
                        <div className="flex items-center gap-1">
                          {formData.privacy === "public" ? (
                            <Globe className="h-3 w-3" />
                          ) : (
                            <Users className="h-3 w-3" />
                          )}
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <div>
                              <div className="font-medium">Public</div>
                              <div className="text-sm text-muted-foreground">Anyone can see this post</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="connections">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <div>
                              <div className="font-medium">Connections</div>
                              <div className="text-sm text-muted-foreground">Only your connections can see</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your post a catchy title..."
                  className={errors.title ? "border-red-500" : ""}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  {errors.title && <span className="text-red-500">{errors.title}</span>}
                  <span className="ml-auto">{formData.title.length}/100</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="What's on your mind? Share your thoughts, ideas, or updates..."
                  className={`min-h-[120px] ${errors.content ? "border-red-500" : ""}`}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  {errors.content && <span className="text-red-500">{errors.content}</span>}
                  <span className="ml-auto">{formData.content.length}/2000</span>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-3">
                <Label>Images</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(image)}
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-dashed"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Add Images
                </Button>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
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
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <Label>Tags</Label>

                {/* Current Tags */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        #{tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTag(tag)}
                          className="h-auto w-auto p-0 hover:bg-transparent"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Add New Tag */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag(newTag)
                        }
                      }}
                      placeholder="Add a tag..."
                      className="pl-10"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => addTag(newTag)}
                    disabled={!newTag || formData.tags.includes(newTag) || formData.tags.length >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Suggested Tags */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Suggested tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags
                      .filter((tag) => !formData.tags.includes(tag))
                      .slice(0, 8)
                      .map((tag) => (
                        <Button
                          key={tag}
                          variant="outline"
                          size="sm"
                          onClick={() => addTag(tag)}
                          className="h-auto py-1 px-2 text-xs"
                        >
                          #{tag}
                        </Button>
                      ))}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">{formData.tags.length}/10 tags used</p>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="px-6 pb-6">
              {/* Preview Card */}
              <Card className="border-2 border-dashed border-muted-foreground/25">
                <CardContent className="p-6">
                  {/* Preview Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">You</h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>@you</span>
                          <span>•</span>
                          <span>Just now</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            {formData.privacy === "public" ? (
                              <Globe className="h-3 w-3" />
                            ) : (
                              <Users className="h-3 w-3" />
                            )}
                            <span className="capitalize">{formData.privacy}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="space-y-3">
                    {formData.title && <h2 className="text-xl font-bold text-gray-900">{formData.title}</h2>}

                    {formData.content ? (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{formData.content}</p>
                    ) : (
                      <p className="text-muted-foreground italic">Your post content will appear here...</p>
                    )}

                    {/* Preview Images */}
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-lg overflow-hidden">
                        {formData.images.slice(0, 4).map((image, index) => (
                          <img
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                        ))}
                      </div>
                    )}

                    {/* Preview Tags */}
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-blue-600 border-blue-200">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Preview Category */}
                    {formData.category && (
                      <div>
                        <Badge variant="secondary">{formData.category}</Badge>
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />

                  {/* Preview Actions */}
                  <div className="flex items-center gap-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" disabled className="gap-2">
                        <Heart className="h-4 w-4" />0
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" disabled className="gap-2">
                        <MessageCircle className="h-4 w-4" />0
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" disabled className="gap-2">
                        <Share className="h-4 w-4" />0
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="p-6 pt-0">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.content.trim()}>
            Publish Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
