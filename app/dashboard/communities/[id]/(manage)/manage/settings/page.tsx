"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MapPin, Plus, X, Camera } from "lucide-react"
import { useCommunitySettings, availableCategories } from "@/hooks/use-community-management"
import { useToast } from "@/hooks/use-toast"

const communitySettingsSchema = z.object({
  name: z.string().min(3, "Community name must be at least 3 characters").max(50, "Community name must be less than 50 characters"),
  headline: z.string().min(10, "Headline must be at least 10 characters").max(100, "Headline must be less than 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(500, "Description must be less than 500 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  privacy: z.enum(["public", "private"]),
  joinCondition: z.enum(["anyone", "approval", "invite"]),
  rules: z.string().min(10, "Rules must be at least 10 characters"),
  coverImage: z.string().optional(),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  allowMemberPosts: z.boolean(),
  requirePostApproval: z.boolean(),
  allowMemberInvites: z.boolean(),
})

type CommunitySettingsFormData = z.infer<typeof communitySettingsSchema>

export default function SettingsPage() {
  const { communitySettings, handleSettingChange } = useCommunitySettings()
  const { toast } = useToast()
  const [newTag, setNewTag] = useState("")
  const [newCategory, setNewCategory] = useState("")

  const form = useForm<CommunitySettingsFormData>({
    resolver: zodResolver(communitySettingsSchema),
    defaultValues: {
      name: communitySettings.name,
      headline: communitySettings.headline,
      description: communitySettings.description,
      location: communitySettings.location,
      privacy: communitySettings.privacy as "public" | "private",
      joinCondition: communitySettings.joinCondition as "anyone" | "approval" | "invite",
      rules: communitySettings.rules,
      coverImage: communitySettings.coverImage,
      categories: communitySettings.categories,
      tags: communitySettings.tags,
      allowMemberPosts: communitySettings.allowMemberPosts,
      requirePostApproval: communitySettings.requirePostApproval,
      allowMemberInvites: communitySettings.allowMemberInvites,
    },
  })

  const onSubmit = (data: CommunitySettingsFormData) => {
    // Here you would typically send the data to your API
    console.log("Form submitted:", data)
    
    // Update the local state for now
    Object.entries(data).forEach(([key, value]) => {
      handleSettingChange(key, value)
    })

    toast({
      title: "Settings saved",
      description: "Your community settings have been updated successfully.",
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        form.setValue("coverImage", result)
        handleSettingChange("coverImage", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const addCategory = (category: string) => {
    if (category && !form.getValues("categories").includes(category)) {
      const updatedCategories = [...form.getValues("categories"), category]
      form.setValue("categories", updatedCategories)
      setNewCategory("")
    }
  }

  const removeCategory = (category: string) => {
    const updatedCategories = form.getValues("categories").filter((c) => c !== category)
    form.setValue("categories", updatedCategories)
  }

  const addTag = () => {
    if (newTag.trim() && !form.getValues("tags").includes(newTag.trim())) {
      const updatedTags = [...form.getValues("tags"), newTag.trim()]
      form.setValue("tags", updatedTags)
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    const updatedTags = form.getValues("tags").filter((t) => t !== tag)
    form.setValue("tags", updatedTags)
  }

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Cover Image Section */}
        <Card>
          <CardHeader>
            <CardTitle>Community Cover Image</CardTitle>
            <CardDescription>Update your community's cover image to make it more appealing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Cover Image</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="aspect-[4/1] overflow-hidden rounded-lg bg-gray-100 border-2 border-dashed border-gray-300">
                        <Image
                          src={field.value || "https://cdn.thrico.network/defaultEventCover.png"}
                          alt="Community cover"
                          width={400}
                          height={200}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Button
                          type="button"
                          size="sm"
                          className="bg-black/60 hover:bg-black/80 text-white"
                          onClick={() => document.getElementById('cover-upload')?.click()}
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Change Cover
                        </Button>
                        <input
                          id="cover-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customize Community */}
          <Card>
            <CardHeader>
              <CardTitle>Customize Community</CardTitle>
              <CardDescription>Update your community's basic information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Community Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="headline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Headline</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="min-h-[100px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="privacy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Privacy</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="joinCondition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Who can join?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="anyone">Anyone can join</SelectItem>
                        <SelectItem value="approval">Admin approval required</SelectItem>
                        <SelectItem value="invite">Invite only</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Categories and Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Categories & Tags</CardTitle>
              <CardDescription>Manage community categories and tags.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Select value={newCategory} onValueChange={setNewCategory}>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Add category" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCategories
                              .filter((cat) => !field.value.includes(cat))
                              .map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          onClick={() => addCategory(newCategory)}
                          disabled={!newCategory || field.value.includes(newCategory)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((category) => (
                            <Badge key={category} variant="secondary" className="flex items-center gap-1">
                              {category}
                              <X
                                className="w-3 h-3 cursor-pointer hover:text-red-500"
                                onClick={() => removeCategory(category)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag and press Enter"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={handleTagKeyPress}
                          className="flex-1"
                        />
                        <Button type="button" onClick={addTag} disabled={!newTag.trim()}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((tag) => (
                            <Badge key={tag} variant="outline" className="flex items-center gap-1">
                              #{tag}
                              <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeTag(tag)} />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Community Rules */}
          <Card>
            <CardHeader>
              <CardTitle>Manage Discussions and Rules</CardTitle>
              <CardDescription>Set guidelines for your community members.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="rules"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Community Rules</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[200px]"
                        placeholder="Enter community rules, one per line..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Community Permissions</CardTitle>
              <CardDescription>Control what members can do in your community.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="allowMemberPosts"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Allow members to create posts</FormLabel>
                      <FormDescription>Members can create new posts in the community</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirePostApproval"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Require admin approval for posts</FormLabel>
                      <FormDescription>All posts must be approved before being visible</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allowMemberInvites"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Allow members to invite others</FormLabel>
                      <FormDescription>Members can invite new people to join the community</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
