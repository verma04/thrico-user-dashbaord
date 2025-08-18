"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Grid, List, X, ImageIcon, Video, FileText } from "lucide-react"
import { useState, useRef } from "react"
import { toast } from "sonner"
import { useCommunityLayout } from "../layout"

interface CommunityMediaPageProps {
  params: { id: string }
}

export default function CommunityMediaPage({ params }: CommunityMediaPageProps) {
  // Use the context from layout
  const { community, activeTab, canManageCommunity } = useCommunityLayout()
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadDescription, setUploadDescription] = useState("")
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setSelectedFiles(files)
    }
  }

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("Please select files to upload")
      return
    }

    setUploading(true)
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success(`Successfully uploaded ${selectedFiles.length} file(s)`)
      setUploadModalOpen(false)
      setSelectedFiles(null)
      setUploadTitle("")
      setUploadDescription("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      toast.error("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const removeFile = (index: number) => {
    if (selectedFiles) {
      const dt = new DataTransfer()
      for (let i = 0; i < selectedFiles.length; i++) {
        if (i !== index) {
          dt.items.add(selectedFiles[i])
        }
      }
      setSelectedFiles(dt.files)
      if (fileInputRef.current) {
        fileInputRef.current.files = dt.files
      }
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon className="w-4 h-4" />
    if (file.type.startsWith('video/')) return <Video className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
  }

  return (
    <TabsContent value="media">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base md:text-lg">
                {community?.name} - Media Gallery
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Share photos and videos with the community
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" disabled={!community?.isJoined && !canManageCommunity}>
                    <Upload className="w-4 h-4 mr-2" />
                    {community?.isJoined || canManageCommunity ? "Upload" : "Join to Upload"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Upload Media</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="file-upload">Select Files</Label>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileSelect}
                        ref={fileInputRef}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Support images and videos. Max 10MB per file.
                      </p>
                    </div>

                    {selectedFiles && selectedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label>Selected Files ({selectedFiles.length})</Label>
                        <div className="max-h-32 overflow-y-auto space-y-1">
                          {Array.from(selectedFiles).map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                              <div className="flex items-center gap-2">
                                {getFileIcon(file)}
                                <span className="truncate">{file.name}</span>
                                <span className="text-gray-500">({(file.size / 1024 / 1024).toFixed(1)}MB)</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="h-6 w-6 p-0"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="upload-title">Title (Optional)</Label>
                      <Input
                        id="upload-title"
                        value={uploadTitle}
                        onChange={(e) => setUploadTitle(e.target.value)}
                        placeholder="Enter a title for your media"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="upload-description">Description (Optional)</Label>
                      <Textarea
                        id="upload-description"
                        value={uploadDescription}
                        onChange={(e) => setUploadDescription(e.target.value)}
                        placeholder="Add a description..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={handleUpload}
                        disabled={!selectedFiles || selectedFiles.length === 0 || uploading}
                        className="flex-1"
                      >
                        {uploading ? "Uploading..." : "Upload"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setUploadModalOpen(false)}
                        disabled={uploading}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className={viewMode === "grid" ? "grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4" : "space-y-2"}>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className={viewMode === "grid" ? "aspect-square bg-gray-200 rounded-lg overflow-hidden" : "flex items-center gap-3 p-2 bg-gray-50 rounded-lg"}>
                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt="Community media"
                  className={viewMode === "grid" ? "w-full h-full object-cover hover:scale-105 transition-transform" : "w-12 h-12 object-cover rounded"}
                />
                {viewMode === "list" && (
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Media File {index + 1}</h4>
                    <p className="text-xs text-gray-500">Uploaded 2 days ago</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
