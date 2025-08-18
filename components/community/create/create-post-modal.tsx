"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Plus,
  Briefcase,
  BarChart3,
  MessageSquare,
  ImageIcon,
  Video,
  FileText,
  MapPin,
  DollarSign,
  X,
  Upload,
} from "lucide-react"

interface CreatePostModalProps {
  trigger?: React.ReactNode
}

export function CreatePostModal({ trigger }: CreatePostModalProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("post")
  const [pollOptions, setPollOptions] = useState(["", ""])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const addPollOption = () => {
    setPollOptions([...pollOptions, ""])
  }

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions]
    newOptions[index] = value
    setPollOptions(newOptions)
  }

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index))
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles([...selectedFiles, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = (type: string) => {
    console.log(`Submitting ${type}`)
    setOpen(false)
    // Reset form states
    setPollOptions(["", ""])
    setSelectedFiles([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Content</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="post" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Post
            </TabsTrigger>
            <TabsTrigger value="job" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Job
            </TabsTrigger>
            <TabsTrigger value="poll" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Poll
            </TabsTrigger>
            <TabsTrigger value="discussion" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Discussion
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Media
            </TabsTrigger>
          </TabsList>

          {/* Regular Post Tab */}
          <TabsContent value="post" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Create Post
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Textarea
                      placeholder="What's on your mind?"
                      className="min-h-[120px] resize-none border-0 p-0 focus-visible:ring-0 text-lg"
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Photo
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="w-4 h-4 mr-2" />
                          Video
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Article
                        </Button>
                      </div>
                      <Button onClick={() => handleSubmit("post")}>Post</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Job Posting Tab */}
          <TabsContent value="job" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Post a Job
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title *</Label>
                    <Input id="job-title" placeholder="e.g. Senior Software Engineer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Input id="company" placeholder="Company name" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="location" placeholder="Remote, New York, etc." className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-type">Job Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary-min">Salary Range</Label>
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="salary-min" placeholder="Min" className="pl-10" />
                      </div>
                      <span className="text-gray-500">to</span>
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="Max" className="pl-10" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="lead">Lead/Principal</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description *</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Describe the role, responsibilities, and requirements..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills</Label>
                  <Input id="skills" placeholder="React, Node.js, Python (comma separated)" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="urgent" />
                  <Label htmlFor="urgent">Mark as urgent hiring</Label>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSubmit("job")}>Post Job</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Poll Tab */}
          <TabsContent value="poll" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Create Poll
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="poll-question">Poll Question *</Label>
                  <Input id="poll-question" placeholder="What would you like to ask?" />
                </div>

                <div className="space-y-3">
                  <Label>Poll Options *</Label>
                  {pollOptions.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updatePollOption(index, e.target.value)}
                      />
                      {pollOptions.length > 2 && (
                        <Button variant="ghost" size="sm" onClick={() => removePollOption(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addPollOption}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Option
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Poll Duration</Label>
                    <Select defaultValue="7">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">1 week</SelectItem>
                        <SelectItem value="14">2 weeks</SelectItem>
                        <SelectItem value="30">1 month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Poll Settings</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="multiple-choice" />
                        <Label htmlFor="multiple-choice">Allow multiple selections</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="anonymous" />
                        <Label htmlFor="anonymous">Anonymous voting</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="show-results" defaultChecked />
                        <Label htmlFor="show-results">Show results after voting</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSubmit("poll")}>Create Poll</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discussion Tab */}
          <TabsContent value="discussion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Start Discussion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="discussion-title">Discussion Title *</Label>
                  <Input id="discussion-title" placeholder="What would you like to discuss?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discussion-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Discussion</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="career">Career Advice</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="announcements">Announcements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discussion-content">Discussion Content *</Label>
                  <Textarea
                    id="discussion-content"
                    placeholder="Share your thoughts, ask questions, or start a conversation..."
                    className="min-h-[150px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discussion-tags">Tags</Label>
                  <Input id="discussion-tags" placeholder="Add tags (comma separated)" />
                </div>

                <div className="space-y-3">
                  <Label>Discussion Settings</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="pin-discussion" />
                      <Label htmlFor="pin-discussion">Pin this discussion</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="allow-comments" defaultChecked />
                      <Label htmlFor="allow-comments">Allow comments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notify-replies" defaultChecked />
                      <Label htmlFor="notify-replies">Notify me of replies</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSubmit("discussion")}>Start Discussion</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Share Media
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="media-caption">Caption</Label>
                  <Textarea
                    id="media-caption"
                    placeholder="Write a caption for your media..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Media</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Drop files here or click to upload
                          </span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleFileSelect}
                          />
                        </label>
                        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF, MP4 up to 10MB each</p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Files</Label>
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            {file.type.startsWith("image/") ? (
                              <ImageIcon className="w-4 h-4" />
                            ) : (
                              <Video className="w-4 h-4" />
                            )}
                            <span className="text-sm">{file.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {(file.size / 1024 / 1024).toFixed(1)} MB
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Media Type</Label>
                  <RadioGroup defaultValue="photo" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="photo" id="photo" />
                      <Label htmlFor="photo">Photo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <Label htmlFor="video">Video</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="album" id="album" />
                      <Label htmlFor="album">Album</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Privacy Settings</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="allow-download" />
                      <Label htmlFor="allow-download">Allow downloads</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="allow-sharing" defaultChecked />
                      <Label htmlFor="allow-sharing">Allow sharing</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSubmit("media")}>Share Media</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
