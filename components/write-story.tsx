"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

import dynamic from "next/dynamic";

const RichTextEditor = dynamic(
  () =>
    import("@/components/ui/rich-text-editor").then((mod) => mod.RichTextEditor),
  { ssr: false }
);
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Save, Eye, Upload, XIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

// Form validation schema
const storyFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  excerpt: z.string().max(500, "Excerpt must be less than 500 characters").optional(),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  allowComments: z.boolean().default(true),
  notifyFollowers: z.boolean().default(false),
  featureStory: z.boolean().default(false),
})

type StoryFormData = z.infer<typeof storyFormSchema>

interface WriteStorySheetProps {
  children: React.ReactNode
}

export function WriteStory({ children }: WriteStorySheetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newTag, setNewTag] = useState("")

  const form = useForm<StoryFormData>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: [],
      coverImage: "",
      allowComments: true,
      notifyFollowers: false,
      featureStory: false,
    },
  })

  const { watch, setValue, getValues } = form
  const watchedTags = watch("tags")
  const watchedContent = watch("content")

  const addTag = () => {
    if (newTag.trim() && !watchedTags.includes(newTag.trim())) {
      setValue("tags", [...watchedTags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setValue("tags", watchedTags.filter((tag: string) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const onSubmit = (data: StoryFormData, isDraft: boolean = true) => {
    // TODO: Implement save functionality
    console.log({
      ...data,
      isDraft
    })
    // Close drawer after saving
    setIsOpen(false)
  }

  const handleSave = () => {
    const data = getValues()
    onSubmit(data, true)
  }

  const handlePublish = () => {
    form.handleSubmit((data) => onSubmit(data, false))()
  }

  const resetForm = () => {
    form.reset()
    setNewTag("")
  }

  return (
    <Sheet className="w-lvh" open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="bottom"
  className="w-full !max-w-none h-full overflow-y-auto ">
        <div className="mx-auto w-full max-w-6xl h-full flex flex-col">
          <SheetHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle>Write New Story</SheetTitle>
                <SheetDescription>
                  Share your experiences, insights, and stories with the community
                </SheetDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6">
            <Form {...form}>
              <form className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Cover Image */}
                    <FormField
                      control={form.control}
                      name="coverImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Image</FormLabel>
                          <div className="flex space-x-2">
                            <FormControl>
                              <Input
                                placeholder="Enter image URL or upload..."
                                {...field}
                              />
                            </FormControl>
                            <Button variant="outline" size="sm" type="button">
                              <Upload className="w-4 h-4" />
                            </Button>
                          </div>
                          {field.value && (
                            <div className="mt-2">
                              <img
                                src={field.value}
                                alt="Cover preview"
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your story title..."
                              className="text-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Excerpt */}
                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief description of your story (optional)..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Rich Text Editor */}
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content *</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              content={field.value}
                              onChange={field.onChange}
                              placeholder="Start writing your story..."
                              className="min-h-[400px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Author Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium mb-3">Author</h3>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" alt="Your profile" />
                          <AvatarFallback>YN</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Your Name</p>
                          <p className="text-sm text-gray-600">your.email@example.com</p>
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="community-news">Community News</SelectItem>
                              <SelectItem value="member-stories">Member Stories</SelectItem>
                              <SelectItem value="industry-news">Industry News</SelectItem>
                              <SelectItem value="announcements">Announcements</SelectItem>
                              <SelectItem value="tutorials">Tutorials</SelectItem>
                              <SelectItem value="career-advice">Career Advice</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a tag..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={handleKeyPress}
                        />
                        <Button onClick={addTag} size="sm" variant="outline" type="button">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {watchedTags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {watchedTags.map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                              <span>{tag}</span>
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:text-red-500"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Publishing Options */}
                    <div className="space-y-4">
                      <Label>Publishing Options</Label>
                      
                      <FormField
                        control={form.control}
                        name="allowComments"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Allow comments
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notifyFollowers"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Notify followers
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="featureStory"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Request to feature story
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Stats Preview */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Estimated Reading Time</h3>
                      <p className="text-sm text-gray-600">
                        {Math.max(1, Math.ceil(watchedContent.replace(/<[^>]*>/g, '').split(' ').length / 200))} min read
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>

          <SheetFooter className="border-t">
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={resetForm} type="button">
                Clear All
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleSave} type="button">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button 
                  onClick={handlePublish} 
                  type="button"
                  disabled={!form.watch("title") || !form.watch("content") || !form.watch("category")}
                >
                  Publish Story
                </Button>
              </div>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}
